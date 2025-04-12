import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { db } from "~/lib/db/sqlite";

export const loadLatestReadingsOpts = () =>
  queryOptions({
    queryKey: ["loadLatestReadings"],
    queryFn: loadLatestReadings,
  });

export const loadLatestReadings = createServerFn().handler(async () => {
  const selectPromises = [
    db
      .selectFrom("electricity_readings")
      .selectAll()
      .orderBy("created_at", "desc")
      .limit(1)
      .executeTakeFirst(),
    db
      .selectFrom("gas_readings")
      .selectAll()
      .orderBy("created_at", "desc")
      .limit(1)
      .executeTakeFirst(),
  ];

  const [latestElectricityReading, latestGasReading] = await Promise.all(selectPromises);

  return {
    electricity: latestElectricityReading!.kwh ?? null,
    gas: latestGasReading!.kwh ?? null,
  };
});
