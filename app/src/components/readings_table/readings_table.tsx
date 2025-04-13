import { useSuspenseQuery } from "@tanstack/react-query";
import { loadAllReadingsOpts } from "~/funcs/readings_load_all";
import { Spinner } from "../spinner";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { columns } from "./readings_table_columns";
import { Button } from "../ui/button";
import { getRouteApi, Link, useNavigate } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { ChevronDown } from "lucide-react";
const routeApi = getRouteApi('/readings/')

export function ReadingsTable() {
  const routeSearch = routeApi.useSearch()
  const navigate = useNavigate({ from: "/readings" })

  const { data, isLoading } = useSuspenseQuery(loadAllReadingsOpts(routeSearch));

  if (isLoading) return <Spinner />;

  if (!data) return <p>No readings where found</p>;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  })

  return (
    <div>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline"><ChevronDown /> {routeSearch.limit}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            <DropdownMenuLabel>Page Size</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[10, 25, 50, 100].map((limit) => (
              <DropdownMenuItem key={limit} onSelect={() => navigate({ search: (prev) => ({ ...prev, limit: limit }) })}>
                {limit}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Link disabled={routeSearch.offset === 0} to="." search={(prev) => ({ ...prev, offset: prev.offset! - 1 })}>
          <Button
            variant="outline"
            size="sm"
            disabled={routeSearch.offset === 0}
          >
            Previous
          </Button>
        </Link>
        <Link disabled={data.length < routeSearch.limit} to="." search={(prev) => ({ ...prev, offset: prev.offset! + 1 })}>
          <Button
            variant="outline"
            size="sm"
            disabled={data.length < routeSearch.limit}
          >
            Next
          </Button>
        </Link>
      </div>
    </div>
  )
}
