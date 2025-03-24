import { createFileRoute } from "@tanstack/react-router";
import { PricesEnergyCard } from "~/components/prices_energy_card";

export const Route = createFileRoute("/prices")({
  component: PriceComponent,
});

function PriceComponent() {
  return (
    <div className="relative flex min-h-screen flex-col space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Prices</h2>
      </div>

      <PricesEnergyCard />
    </div>
  );
}
