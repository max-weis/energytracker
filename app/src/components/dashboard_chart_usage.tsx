import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "./ui/chart";
import { Card } from "./ui/card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getDashboardUsageOpts } from "~/funcs/dashboard_get_usage";

const chartConfig = {
  electricity: { label: "Electricity", color: "#facc15" },
  gas: { label: "Gas", color: "#f97316" },
} satisfies ChartConfig;

export function DashboardChartUsage() {
  const { data: chartData } = useSuspenseQuery(getDashboardUsageOpts());

  return (
    <Card>
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
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Line type="monotone" dataKey="electricity" stroke="var(--color-electricity)" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="gas" stroke="var(--color-gas)" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ChartContainer>
    </Card>
  );
}
