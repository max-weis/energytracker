import { createServerFn } from "@tanstack/react-start";
import { db } from "~/lib/db/sqlite";

type NewPriceType = {
  electricity_base_price: number;
  electricity_unit_price: number;
  gas_base_price: number;
  gas_unit_price: number;
};

export const addNewPrice = createServerFn({
  method: "POST",
}).validator((data: NewPriceType) => data).handler(async (ctx) => {
  const data = ctx.data as unknown as NewPriceType;

  return db.insertInto("prices").values(data).execute();
});
