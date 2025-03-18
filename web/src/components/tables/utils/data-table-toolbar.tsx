"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileIcon, Link, Text } from "lucide-react";

export const TRAIN_DATA_FILTERS = [
  {
    label: "Text",
    value: "direct_text",
    icon: Text,
  },
  {
    label: "Websites",
    value: "websites",
    icon: Link,
  },

  {
    label: "Files",
    value: "files",
    icon: FileIcon,
  },
];
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  columnName: string;
}

export function DataTableToolbar<TData>({
  table,
  columnName,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2 mb-3">
        <Input
          placeholder="Filter Documents by content"
          value={
            (table.getColumn(columnName)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(columnName)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px] placeholder:text-xs"
        />

        {table.getAllColumns().find((x) => x.id === "priority") && ( // table.getColumn("priority")
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={TRAIN_DATA_FILTERS}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
