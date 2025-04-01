import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { db } from "~/lib/db/sqlite";

export const loadAllPricesOpts = () =>
  queryOptions({
    queryKey: ["loadAllPrices"],
    queryFn: loadAllPrices,
  });

export const loadAllPrices = createServerFn().handler(async () => {
  const latest = await db
    .selectFrom("prices")
    .selectAll()
    .orderBy("created_at desc")
    .execute();

  if (!latest) return null;

  return latest;
});
