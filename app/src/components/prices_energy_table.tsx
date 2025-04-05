import { useSuspenseQuery } from "@tanstack/react-query";
import { loadAllPricesOpts } from "~/funcs/prices_load_all";
import { Card } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { formatEuroCents } from "~/lib/eurocent";

export function PricesEnergyTable() {
  const { data } = useSuspenseQuery(loadAllPricesOpts());

  if (!data) return <p>No prices where found</p>;

  return (
    <>
      <Card className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Base Price</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Added</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data!.map((price) => (
              <TableRow>
                <TableCell>
                  {
                    price.type === "electricity" ?
                      <Badge variant="secondary" className="bg-yellow-500">Electricity</Badge> :
                      <Badge variant="secondary" className="bg-blue-500 text-white">Gas</Badge>
                  }
                </TableCell>
                <TableCell>{formatEuroCents(price.base_price)}</TableCell>
                <TableCell>{formatEuroCents(price.unit_price)}</TableCell>
                <TableCell>{new Date(price.created_at).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
