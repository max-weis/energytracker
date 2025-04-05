import { sql } from "kysely";
import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { db } from "~/lib/db/sqlite";

export const loadAllPricesOpts = () =>
  queryOptions({
    queryKey: ["loadAllPrices"],
    queryFn: loadAllPrices,
  });

export const loadAllPrices = createServerFn().handler(async () => {
  return await db
    .selectFrom("gas_prices")
    .select([
      "id",
      "base_price",
      "unit_price",
      "created_at",
      sql<string>`'gas'`.as("type")
    ])
    .unionAll(qb =>
      qb
        .selectFrom("electricity_prices")
        .select([
          "id",
          "base_price",
          "unit_price",
          "created_at",
          sql<string>`'electricity'`.as("type")
        ])
    )
    .orderBy("created_at", "desc")
    .execute();
});
