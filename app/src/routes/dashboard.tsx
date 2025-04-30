import { createFileRoute, Link } from "@tanstack/react-router";
import { PlusCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { DashboardOverview } from "~/components/dashboard_overview";
import { DashboardChartUsage } from "~/components/dashboard_chart_usage";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog"
import { ReadingsNewCard } from "~/components/readings_new_card";
import { loadLatestReadingsOpts } from "~/funcs/readings_load_latest";
import { useState } from "react";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(loadLatestReadingsOpts());
  },
});

function RouteComponent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen p-4 md:p-6 pt-6">
        <div className="mx-auto w-full max-w-screen-xl flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <Button variant="outline" className="bg-primary text-background">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Reading
                </Button>
              </DialogTrigger>
              <DialogContent>
                <ReadingsNewCard onClose={() => setOpen(false)}  />
              </DialogContent>
            </Dialog>
          </div>

          <DashboardOverview />
          <DashboardChartUsage />
        </div>
      </div>
    </>
  );
}
