import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getDashboardUsageOpts } from '~/funcs/dashboard_get_usage';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from './ui/table';

export function ReportsTable() {
  const { data } = useSuspenseQuery(getDashboardUsageOpts());
  return (
    <div className="p-4 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Month</TableHead>
            <TableHead>Electricity (kWh)</TableHead>
            <TableHead>Gas (kWh)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(({ month, electricity, gas }) => (
            <TableRow key={month}>
              <TableCell>{month}</TableCell>
              <TableCell>{electricity}</TableCell>
              <TableCell>{gas}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
