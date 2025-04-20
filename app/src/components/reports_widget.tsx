import { ChartBar, Table } from 'lucide-react';
import { ReportsChart } from './reports_widget_chart';
import { ReportsTable } from './reports_widget_table';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function ReportsWidget() {
  return (
    <Card className="bg-white w-[400px]">
      <Tabs defaultValue="chart">
        <TabsList>
          <TabsTrigger value="chart"><ChartBar/> </TabsTrigger>
          <TabsTrigger value="table"><Table /> </TabsTrigger>
        </TabsList>
      <TabsContent value="chart">
        <ReportsChart />
      </TabsContent>
      <TabsContent value="table">
        <ReportsTable />
      </TabsContent>
    </Tabs>
    </Card>
  );
}