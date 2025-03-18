"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { TrainDataColumn } from "./columns";
import { DataTableToolbar } from "../utils/data-table-toolbar";
import { DataTablePagination } from "../utils/table-pagination";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  data: any[]; // TODO:: Model Schema
  className?: string;
  withPagination?: boolean;
}

export function AIModelsTable<TData, TValue>({
  data,
  className,
  withPagination = true,
}: DataTableProps<TData, TValue>) {
  // states
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns: TrainDataColumn,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className={cn("", className)}>
      {/* <DataTableToolbar columnName="pageContent" table={table} /> */}

      <div className="h-full rounded-xl  pb-11">
        <div className="rounded-xl ">
          <Table className="rounded-xl">
            <TableHeader className=" bg-zinc-200/50 dark:bg-zinc-800 !rounded-xl !border-none ">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow className=" !border-none  " key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => {
                    return (
                      <TableHead
                        className={cn(
                          "text-black capitalize dark:text-white mx-auto",
                          index == 0 && " !rounded-l-lg",
                          index == headerGroup.headers.length - 1 &&
                            "!rounded-r-lg"
                        )}
                        key={header.id}
                      >
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
            <TableBody className="">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className="!border-b-zinc-200/70"
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
                    colSpan={TrainDataColumn.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="py-2">
          {withPagination && <DataTablePagination table={table} />}
        </div>
      </div>
    </div>
  );
}
