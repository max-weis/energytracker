import { ChartBar, Table } from 'lucide-react';
import { ReportsChart } from './reports_widget_chart';
import { ReportsTable } from './reports_widget_table';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function ReportsWidget() {
  return (
    <Card className="bg-background p-4">
      <Tabs defaultValue="chart">
        <TabsList className="grid grid-cols-2 bg-tertiary">
          <TabsTrigger
            value="chart"
            className="flex items-center justify-center gap-2 data-[state=active]:bg-background"
            aria-label="Show chart view"
          >
            <ChartBar size={16} />
            <span className="text-sm font-medium">Chart</span>
          </TabsTrigger>
          <TabsTrigger
            value="table"
            className="flex items-center justify-center gap-2 data-[state=active]:bg-background "
            aria-label="Show table view"
          >
            <Table size={16} />
            <span className="text-sm font-medium">Table</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chart" className="mt-4">
          <div>
            <ReportsChart />
          </div>
        </TabsContent>

        <TabsContent value="table" className="mt-4">
          <div className="overflow-auto">
            <ReportsTable />
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
