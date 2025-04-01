import { useSuspenseQuery } from "@tanstack/react-query";
import { loadAllPricesOpts } from "~/funcs/prices_load_all";
import { Card } from "./ui/card";

export function PricesEnergyTable() {
  const { data } = useSuspenseQuery(loadAllPricesOpts());

  if (!data) return <p>No prices where found</p>;

  return (
    <>
      <div>
        <Card>
          <ul>
            {data!.map((price) => (
              <li>{price.id}</li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
