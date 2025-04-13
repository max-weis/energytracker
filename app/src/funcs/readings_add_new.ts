import { createServerFn } from "@tanstack/react-start";
import { db } from "~/lib/db/sqlite";

type NewReadingsType = {
  electricity: number;
  gas: number;
};

async function loadLatestReadings() {
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
}

function latestElectricityPrice() {
  return db.selectFrom("electricity_prices")
    .select(["electricity_prices.id", "electricity_prices.unit_price"])
    .executeTakeFirst();
}

function latestGasPrice() {
  return db.selectFrom("gas_prices")
    .select(["gas_prices.id", "gas_prices.unit_price"])
    .executeTakeFirst();
}

export const addNewReadings = createServerFn({
  method: "POST",
})
  .validator((data: NewReadingsType) => data)
  .handler(async (ctx) => {
    const newReadings = ctx.data as NewReadingsType;
    const insertPromises = [];

    const latestReadings = await loadLatestReadings();

    const electricityDiff = newReadings.electricity - latestReadings.electricity;
    if (electricityDiff > 0) {
      const latestPrice = await latestElectricityPrice();
      if (!latestPrice) throw new Error("No electricity price found");

      insertPromises.push(db.insertInto("electricity_readings").values({
        kwh: newReadings.electricity,
        kwh_difference: electricityDiff,
        kwh_difference_percentage: (electricityDiff / latestReadings.electricity) * 100,
        electricity_price_id: latestPrice.id,
        price: electricityDiff * latestPrice.unit_price
      }).execute());
    }

    const gasDiff = newReadings.gas - latestReadings.gas;
    if (gasDiff > 0) {
      const latestPrice = await latestGasPrice();
      if (!latestPrice) throw new Error("No gas price found");

      insertPromises.push(db.insertInto("gas_readings").values({
        kwh: newReadings.gas,
        kwh_difference: gasDiff,
        kwh_difference_percentage: (gasDiff / latestReadings.gas) * 100,
        gas_price_id: latestPrice.id,
        price: gasDiff * latestPrice.unit_price
      }).execute());
    }

    await Promise.all(insertPromises);

    return { success: true };
  });
