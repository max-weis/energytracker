import { createFileRoute, Link } from "@tanstack/react-router";
import { PlusCircle } from "lucide-react";
import { ReadingsTable } from "~/components/readings_table/readings_table";
import { Button } from "~/components/ui/button";
import { loadAllReadingsPageOpts } from "~/funcs/readings_load_all";

export const Route = createFileRoute("/readings/")({
  component: RouteComponent,
  validateSearch: (
    search: Record<string, unknown>,
  ): loadAllReadingsPageOpts => {
    return {
      limit: Number(search.limit) || 10,
      offset: Number(search.offset) || 0,
      sortOrder: (["asc", "desc"].includes(search.sortOrder as string)
        ? search.sortOrder
        : "desc") as "asc" | "desc",
      sortKey: ([
        "kwh",
        "kwh_difference",
        "kwh_difference_percentage",
        "price",
        "created_at",
        "base_price",
        "type",
      ].includes(search.sortKey as string)
        ? search.sortKey
        : "created_at") as loadAllReadingsPageOpts["sortKey"],
    };
  },
});

function RouteComponent() {
  return (
    <>
      <div className="min-h-screen p-4 md:p-6 pt-6">
        <div className="mx-auto w-full max-w-screen-lg flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">
              Meter Readings
            </h2>
            <Link to="/readings/new">
              <Button variant="outline" className="bg-primary text-background">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Reading
              </Button>
            </Link>
          </div>

          <ReadingsTable />
        </div>
      </div>
    </>
  );
}
