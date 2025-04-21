import { createFileRoute } from "@tanstack/react-router";
import { ReportsNewCard } from "~/components/reports_new_card";

export const Route = createFileRoute("/reports/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="min-h-screen p-4 md:p-6 pt-6">
        <div className="mx-auto w-full max-w-screen-lg flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">New Report</h2>
          </div>
          
          <ReportsNewCard />
        </div>
      </div>
    </>
  );
}
