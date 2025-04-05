import { createServerFn } from "@tanstack/react-start";
import { db } from "~/lib/db/sqlite";

export const addNewReading = createServerFn({
  method: "POST",
})
  .validator((data: any) => data)
  .handler(async (ctx) => {
  });
