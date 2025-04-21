import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { getDashboardStatsOpts } from "~/funcs/dashboard_get_stats";
import { formatEuroCents } from "~/lib/eurocent";
import { useSuspenseQuery } from "@tanstack/react-query";

export function DashboardOverview() {
  const { data } = useSuspenseQuery(getDashboardStatsOpts());

  const cards = [
    { title: "Electricity Usage", value: data.electricity.usage, unit: "kWh", trend: data.electricity.usageTrend },
    { title: "Electricity Cost", value: formatEuroCents(data.electricity.cost), unit: "", trend: data.electricity.costTrend },
    { title: "Gas Usage", value: data.gas.usage, unit: "kWh", trend: data.gas.usageTrend },
    { title: "Gas Cost", value: formatEuroCents(data.gas.cost), unit: "", trend: data.gas.costTrend },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ title, value, unit, trend }) => {
        const Icon = trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : Minus;
        return (
          <Card key={title} className="bg-background">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value}{unit}</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}