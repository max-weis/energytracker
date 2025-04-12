import { ColumnDef } from "@tanstack/react-table"

export type Reading = {
  id: string
  kwh: number
  kwh_difference: number
  price: number
  created_at: number
  base_price: number
  type: number
}

export const columns: ColumnDef<Reading>[] = [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "kwh",
    header: "kWh",
  },
  {
    accessorKey: "kwh_difference",
    header: "kWh Difference",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "base_price",
    header: "Base Price",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
]
