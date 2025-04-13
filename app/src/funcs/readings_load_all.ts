import { sql } from "kysely";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { db } from "~/lib/db/sqlite";

export const loadAllReadingsOpts = (pageOpts: loadAllReadingsPageOpts) =>
  queryOptions({
    queryKey: ["loadAllReadings", pageOpts],
    queryFn: () => loadAllReadings({ data: pageOpts }),
    placeholderData: keepPreviousData,
  });

export type loadAllReadingsPageOpts = {
  limit: number
  offset: number
}

export const loadAllReadings = createServerFn()
  .validator((data: loadAllReadingsPageOpts) => data)
  .handler(async (ctx) => {
    const gasReadingsQuery = db
      .selectFrom("gas_readings")
      .innerJoin("gas_prices", "gas_readings.gas_price_id", "gas_prices.id")
      .select([
        "gas_readings.id",
        "gas_readings.kwh",
        "gas_readings.kwh_difference",
        "gas_readings.kwh_difference_percentage",
        "gas_readings.price",
        "gas_readings.created_at",
        "gas_prices.base_price",
        sql<string>`'gas'`.as("type"),
      ]);

    const electricityReadingsQuery = db
      .selectFrom("electricity_readings")
      .innerJoin(
        "electricity_prices",
        "electricity_readings.electricity_price_id",
        "electricity_prices.id"
      )
      .select([
        "electricity_readings.id",
        "electricity_readings.kwh",
        "electricity_readings.kwh_difference",
        "electricity_readings.kwh_difference_percentage",
        "electricity_readings.price",
        "electricity_readings.created_at",
        "electricity_prices.base_price",
        sql<string>`'electricity'`.as("type"),
      ]);

    const unionQuery = gasReadingsQuery.unionAll(electricityReadingsQuery);

    const mergedQuery = db
      .selectFrom(unionQuery.as("readings"))
      .select([
        "readings.id",
        "readings.kwh",
        "readings.kwh_difference",
        "readings.kwh_difference_percentage",
        "readings.price",
        "readings.created_at",
        "readings.base_price",
        "readings.type",
      ])
      .orderBy("readings.created_at", "desc")
      .limit(ctx.data.limit)
      .offset(ctx.data.offset * ctx.data.limit);

    return await mergedQuery.execute();
  });
