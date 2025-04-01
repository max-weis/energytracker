import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PricesEnergyCard } from "~/components/prices_energy_card";
import { PricesEnergyTable } from "~/components/prices_energy_table";
import { Spinner } from "~/components/spinner";
import { loadAllPricesOpts } from "~/funcs/prices_load_all";
import { loadLatestPricesOpts } from "~/funcs/prices_load_latest";

export const Route = createFileRoute("/prices")({
  component: PriceComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(loadLatestPricesOpts());
    await context.queryClient.ensureQueryData(loadAllPricesOpts());
  },
});

function PriceComponent() {
  const { isLoading: latestLoading } = useSuspenseQuery(loadLatestPricesOpts());
  const { isLoading: allLoading } = useSuspenseQuery(loadAllPricesOpts());

  if (latestLoading && allLoading) return <Spinner />;

  return (
    <div className="min-h-screen p-4 md:p-6 pt-6">
      <div className="mx-auto w-full max-w-screen-lg flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Prices</h2>
        </div>

        <PricesEnergyCard />
        <PricesEnergyTable />
      </div>
    </div>
  );
}
