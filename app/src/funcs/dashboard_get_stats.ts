// Imaginary data-fetching function for dashboard stats
import { createServerFn } from "@tanstack/react-start";
import { db } from "~/lib/db/sqlite";
import { sql } from "kysely";
import { queryOptions } from "@tanstack/react-query";

export const getDashboardStatsOpts = () =>
  queryOptions({
    queryKey: ["getDashboardStats"],
    queryFn: getDashboardStats,
  });

export const getDashboardStats = createServerFn({ method: "GET" })
  .handler(async () => {
    const now = new Date();
    const thirty = new Date(now);
    thirty.setDate(now.getDate() - 30);
    const sixty = new Date(now);
    sixty.setDate(now.getDate() - 60);

    // Helper to sum readings
    async function sum(table: "electricity_readings" | "gas_readings", from: Date, to?: Date) {
      const fromIso = from.toISOString();
      const toIso = to?.toISOString();
      let q = db.selectFrom(table)
        .select([
          sql<number>`SUM(kwh)`.as("usage"),
          sql<number>`SUM(price)`.as("cost"),
        ]);
      q = q.where("created_at", ">=", fromIso as any);
      if (toIso) {
        q = q.where("created_at", "<", toIso as any);
      }
      return q.executeTakeFirst();
    }

    // Electricity usage: diff between latest and 30d ago readings
    const latestElec = await db.selectFrom("electricity_readings")
      .select("kwh")
      .orderBy("created_at", "desc")
      .limit(1)
      .executeTakeFirst();
    const elec30 = await db.selectFrom("electricity_readings")
      .select("kwh")
      .where("created_at", "<=", thirty.toISOString() as any)
      .orderBy("created_at", "desc")
      .limit(1)
      .executeTakeFirst();
    const elec60 = await db.selectFrom("electricity_readings")
      .select("kwh")
      .where("created_at", "<=", sixty.toISOString() as any)
      .orderBy("created_at", "desc")
      .limit(1)
      .executeTakeFirst();
    const elecUsage = (latestElec?.kwh ?? 0) - (elec30?.kwh ?? 0);
    const prevElecUsage = (elec30?.kwh ?? 0) - (elec60?.kwh ?? 0);
    const elecUsageTrend = prevElecUsage ? Math.round(((elecUsage - prevElecUsage) / prevElecUsage) * 100) : 0;
    // Electricity cost sum and trend
    const currentElecCost = await sum("electricity_readings", thirty);
    const prevElecCostSum = await sum("electricity_readings", sixty, thirty);
    const elecCost = currentElecCost?.cost ?? 0;
    const elecPrevCost = prevElecCostSum?.cost ?? 0;
    const elecCostTrend = elecPrevCost ? Math.round(((elecCost - elecPrevCost) / elecPrevCost) * 100) : 0;

    // Gas usage: diff between latest and 30d ago
    const latestGas = await db.selectFrom("gas_readings")
      .select("kwh")
      .orderBy("created_at", "desc")
      .limit(1)
      .executeTakeFirst();
    const gas30 = await db.selectFrom("gas_readings")
      .select("kwh")
      .where("created_at", "<=", thirty.toISOString() as any)
      .orderBy("created_at", "desc")
      .limit(1)
      .executeTakeFirst();
    const gas60 = await db.selectFrom("gas_readings")
      .select("kwh")
      .where("created_at", "<=", sixty.toISOString() as any)
      .orderBy("created_at", "desc")
      .limit(1)
      .executeTakeFirst();
    const gasUsage = (latestGas?.kwh ?? 0) - (gas30?.kwh ?? 0);
    const prevGasUsage = (gas30?.kwh ?? 0) - (gas60?.kwh ?? 0);
    const gasUsageTrend = prevGasUsage ? Math.round(((gasUsage - prevGasUsage) / prevGasUsage) * 100) : 0;
    // Gas cost sum and trend
    const currentGasCost = await sum("gas_readings", thirty);
    const prevGasCostSum = await sum("gas_readings", sixty, thirty);
    const gasCost = currentGasCost?.cost ?? 0;
    const gasPrevCost = prevGasCostSum?.cost ?? 0;
    const gasCostTrend = gasPrevCost ? Math.round(((gasCost - gasPrevCost) / gasPrevCost) * 100) : 0;

    return {
      electricity: {
        usage: elecUsage,
        usageTrend: elecUsageTrend,
        cost: elecCost,
        costTrend: elecCostTrend,
      },
      gas: {
        usage: gasUsage,
        usageTrend: gasUsageTrend,
        cost: gasCost,
        costTrend: gasCostTrend,
      },
    };
  });
