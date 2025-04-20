import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { db } from "~/lib/db/sqlite";
import { sql } from "kysely";

export const getDashboardUsageOpts = () =>
    queryOptions({
        queryKey: ["getDashboardUsage"],
        queryFn: getDashboardUsage,
    });

export const getDashboardUsage = createServerFn({ method: "GET" }).handler(
  async () => {
    const now = new Date();
    const monthsToShow = 6;
    const data: { month: string; electricity: number; gas: number }[] = [];
    for (let i = monthsToShow - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthLabel = date.toLocaleString("default", { month: "long" });
      const start = date.toISOString();
      const end = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        1
      ).toISOString();
      const elec = await db
        .selectFrom("electricity_readings")
        .select(sql<number>`SUM(kwh_difference)`.as("usage"))
        .where("created_at", ">=", start as any)
        .where("created_at", "<", end as any)
        .executeTakeFirst();
      const gas = await db
        .selectFrom("gas_readings")
        .select(sql<number>`SUM(kwh_difference)`.as("usage"))
        .where("created_at", ">=", start as any)
        .where("created_at", "<", end as any)
        .executeTakeFirst();
      data.push({
        month: monthLabel,
        electricity: elec?.usage ?? 0,
        gas: gas?.usage ?? 0,
      });
    }
    return data;
  }
);
