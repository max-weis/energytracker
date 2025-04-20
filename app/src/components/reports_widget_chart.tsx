import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getDashboardUsageOpts } from '~/funcs/dashboard_get_usage';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from './ui/chart';

const chartConfig = {
  electricity: { label: 'Electricity', color: '#facc15' },
  gas: { label: 'Gas', color: '#f97316' },
} satisfies ChartConfig;

export function ReportsChart() {
  const { data: chartData } = useSuspenseQuery(getDashboardUsageOpts());

  return (
    <div className="p-4">
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <LineChart data={chartData}> 
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Line type="monotone" dataKey="electricity" stroke="var(--color-electricity)" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="gas" stroke="var(--color-gas)" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
