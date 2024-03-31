"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  FilterFn,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-time-picker/date-time-picker";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import dateFilterFn from "./dateFilter";
import { User } from "@/types/types";

declare module "@tanstack/table-core" {
  interface FilterFns {
    dateFilterFn: FilterFn<User>;
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filter, setFilter] = useState<string>("idNumber");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setColumnFilters((old) => [
        ...old.filter((filter) => filter.id !== "attendance"),
        {
          id: "attendance",
          value: { date, time: date },
        },
      ]);
    }
  };

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      dateFilterFn: dateFilterFn,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  useEffect(() => {
    setColumnFilters([]); // Resets filters everytime selected filter is changed.
  }, [filter]);

  return (
    <div className="mx-4">
      <div className="flex gap-2 items-center py-4">
        <Select
          onValueChange={(newValue: string) => {
            setFilter(newValue);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="idNumber">ID Number</SelectItem>
            <SelectItem value="userName">Name</SelectItem>
            <SelectItem value="address">Address</SelectItem>
            <SelectItem value="contactNumber">Contact Number</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="time-day">Time and Day</SelectItem>
          </SelectContent>
        </Select>
        {filter !== "time-day" ? (
          <Input
            placeholder="Enter search term..."
            value={(table.getColumn(filter)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(filter)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        ) : (
          <DateTimePicker handleDateChange={handleDateChange} />
        )}
      </div>
      <div className="rounded-md border">
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
                  );
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
