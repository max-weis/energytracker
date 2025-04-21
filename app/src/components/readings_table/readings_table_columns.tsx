import { ColumnDef } from "@tanstack/react-table";
import { formatEuroCents } from "~/lib/eurocent";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

export type Reading = {
  id: number;
  kwh: number;
  kwh_difference: number;
  price: number;
  created_at: Date;
  base_price: number;
  type: string;
};

export const columns: ColumnDef<Reading>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) =>
      row.getValue("type") === "electricity" ? (
        <Badge variant="secondary" className="bg-yellow-500 text-foreground">
          Electricity
        </Badge>
      ) : (
        <Badge variant="secondary" className="bg-blue-500 text-background">
          Gas
        </Badge>
      ),
  },
  {
    accessorKey: "kwh",
    header: "kWh",
  },
  {
    accessorKey: "kwh_difference",
    header: () => <div className="text-right">kWh Difference</div>,
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("kwh_difference")}</div>
    ),
  },
  {
    accessorKey: "kwh_difference_percentage",
    header: () => <div className="text-right">kWh Difference in %</div>,
    cell: ({ row }) => (
      <div className="text-right">
        {row.getValue("kwh_difference_percentage")}
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div className="font-medium">
        {formatEuroCents(row.getValue("price"))}
      </div>
    ),
  },
  {
    accessorKey: "base_price",
    header: "Base Price",
    cell: ({ row }) => (
      <div className="font-medium">
        {formatEuroCents(row.getValue("base_price"))}
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => (
      <div className="font-medium">
        {new Date(row.getValue("created_at")).toLocaleString()}
      </div>
    ),
  },
];
