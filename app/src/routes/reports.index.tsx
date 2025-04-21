import { createFileRoute, Link } from "@tanstack/react-router";
import { PlusCircle } from "lucide-react";
import { ReportsWidget } from "~/components/reports_widget";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/reports/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="min-h-screen p-4 md:p-6 pt-6">
        <div className="mx-auto w-full max-w-screen-lg flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
            <Link to="/reports/new">
              <Button variant="outline" className="bg-primary text-background">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Report
              </Button>
            </Link>
          </div>

          <ReportsWidget />
        </div>
      </div>
    </>
  );
}
