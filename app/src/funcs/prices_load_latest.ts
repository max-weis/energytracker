import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { db } from "~/lib/db/sqlite";

export const loadLatestPricesOpts = () =>
  queryOptions({
    queryKey: ["loadLatestPrices"],
    queryFn: loadLatestPrices,
  });

export const loadLatestPrices = createServerFn().handler(async () => {
  const selectPromises = [
    db
      .selectFrom("electricity_prices")
      .selectAll()
      .orderBy("created_at", "desc")
      .limit(1)
      .executeTakeFirst(),
    db
      .selectFrom("gas_prices")
      .selectAll()
      .orderBy("created_at", "desc")
      .limit(1)
      .executeTakeFirst(),
  ];

  const [latestElectricityPrice, latestGasPrice] = await Promise.all(selectPromises);

  return {
    electricityPrice: latestElectricityPrice ?? null,
    gasPrice: latestGasPrice ?? null,
  };
});
