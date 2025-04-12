import { sql } from "kysely";
import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { db } from "~/lib/db/sqlite";

export const loadAllReadingsOpts = () =>
  queryOptions({
    queryKey: ["loadAllReadings"],
    queryFn: loadAllReadings,
  });

export const loadAllReadings = createServerFn().handler(async () => {
  return await db
    .selectFrom("gas_readings")
    .innerJoin("gas_prices", "gas_readings.gas_price_id", "gas_prices.id")
    .select([
      "gas_readings.id",
      "gas_readings.kwh",
      "gas_readings.kwh_difference",
      "gas_readings.price",
      "gas_readings.created_at",
      "gas_prices.base_price",
      sql<string>`'gas'`.as("type")
    ])
    .unionAll(qb =>
      qb
        .selectFrom("electricity_readings")
        .innerJoin("electricity_prices", "electricity_readings.electricity_price_id", "electricity_prices.id")
        .select([
          "electricity_readings.id",
          "electricity_readings.kwh",
          "electricity_readings.kwh_difference",
          "electricity_readings.price",
          "electricity_readings.created_at",
          "electricity_prices.base_price",
          sql<string>`'electricity'`.as("type")
        ])
    )
    .execute();
});
