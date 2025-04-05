import { createServerFn } from "@tanstack/react-start";
import { db } from "~/lib/db/sqlite";

type Price = {
  base_price: number;
  unit_price: number;
};

type NewPriceType = {
  newElectricityPrice?: Price;
  newGasPrice?: Price;
};

export const addNewPrice = createServerFn({
  method: "POST",
})
  .validator((data: NewPriceType) => data)
  .handler(async (ctx) => {
    const { newElectricityPrice, newGasPrice } = ctx.data as NewPriceType;
    const insertPromises = [];

    if (newElectricityPrice) {
      insertPromises.push(
        db.insertInto("electricity_prices")
          .values(newElectricityPrice)
          .execute()
      );
    }

    if (newGasPrice) {
      insertPromises.push(
        db.insertInto("gas_prices")
          .values(newGasPrice)
          .execute()
      );
    }

    await Promise.all(insertPromises);

    return { success: true };
  });
