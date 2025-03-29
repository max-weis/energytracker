import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, ErrorComponent } from "@tanstack/react-router";
import { PricesEnergyCard } from "~/components/prices_energy_card";
import { Spinner } from "~/components/spinner";
import { loadLatestPricesOpts } from "~/funcs/prices_load_latest";

export const Route = createFileRoute("/prices")({
  component: PriceComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(loadLatestPricesOpts());
  },
  errorComponent: ({ error }) => {
    return <ErrorComponent error={error} />
  },
});

function PriceComponent() {
  const { data, isLoading } = useSuspenseQuery(loadLatestPricesOpts())

  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-screen p-4 md:p-6 pt-6">
      <div className="mx-auto w-full max-w-screen-lg flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Prices</h2>
        </div>

        <PricesEnergyCard price={data} />
      </div>
    </div>

  );
}
