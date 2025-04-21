import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "./ui/chart";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getDashboardUsageOpts } from "~/funcs/dashboard_get_usage";

const chartConfig = {
  electricity: { label: "Electricity", color: "#facc15" },
  gas: { label: "Gas", color: "#f97316" },
} satisfies ChartConfig;

export function DashboardChartUsage() {
  const { data: chartData } = useSuspenseQuery(getDashboardUsageOpts());

  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>Usage - last 6 months</CardTitle>
      </CardHeader>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <LineChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Line type="monotone" dataKey="electricity" stroke="#EAB209" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="gas" stroke="#3B83F7" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ChartContainer>
    </Card>
  );
}
