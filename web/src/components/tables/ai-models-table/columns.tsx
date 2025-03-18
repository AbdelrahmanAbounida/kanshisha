"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  CheckCircle,
  CheckIcon,
  CircleCheck,
  Download,
  FileIcon,
  LoaderIcon,
  MoreHorizontal,
  Pencil,
  Puzzle,
  RefreshCcw,
  Rocket,
  SquareArrowOutUpRight,
  TestTube,
  TestTubeDiagonal,
  Trash,
  Trash2,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { DataTableColumnHeader } from "../utils/column-header";
import { Badge } from "@/components/ui/badge";
import { FcDocument } from "react-icons/fc";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { AIModlel } from "@/constants/demo";
import { cn } from "@/lib/utils";

export const TrainDataColumn: ColumnDef<AIModlel>[] = [
  {
    accessorKey: "activity",
    cell: ({ row }: any) => {
      const activity = row.getValue("activity");
      const updatedAt = row.original?.updatedAt;
      const formattedDate = updatedAt
        ? new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }).format(new Date(updatedAt))
        : "";

      const icon =
        activity === "manual" ? (
          <RefreshCcw className="text-primary w-4 h-4" />
        ) : (
          <Rocket className="text-green-600 w-4 h-4" />
        );

      return (
        <div className="flex items-center gap-4">
          <div className=" rounded-full">{icon}</div>

          <div className="flex flex-col">
            <p className="text-sm text-zinc-700 capitalize dark:text-gray-400">
              {activity}
            </p>
            <p className=" text-zinc-950/50 text-xs dark:text-gray-400 ">
              {formattedDate}
            </p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusIcon =
        status === "successful" ? (
          <div className="bg-green-600 rounded-full  w-3 h-3 flex items-center justify-center mr-1">
            <CheckIcon className="text-white w-2 h-2" />
          </div>
        ) : status === "failed" ? (
          <XIcon className="w-3 h-3 mr-1" />
        ) : (
          <LoaderIcon className="w-3 h-3 mr-1" />
        );
      return (
        <Badge
          variant={"outline"}
          className={cn(
            "border-none bg-zinc-100 text-xs font-light rounded-md flex items-center w-fit space-x-1 pl-1 pr-1.5 py-0.5",
            status === "failed" &&
              " text-red-600 dark:text-red-500 bg-red-600/10 dark:bg-red-500/10",
            status === "running" &&
              " text-yellow-600 dark:text-yellow-500 bg-yellow-600/10 dark:bg-yellow-500/10",
            status == "successful" &&
              " !text-green-600 dark:text-green-500 bg-green-600/10 dark:bg-green-500/10"
          )}
        >
          {statusIcon} {status}
        </Badge>
      );
    },
  },

  {
    accessorKey: "losses",
    cell: ({ row }) => {
      const losses = row.getValue("losses") as number;
      return (
        <p className="text-sm text-zinc-950/90 dark:text-gray-400">
          {losses?.toFixed(2)}
        </p>
      );
    },
  },

  {
    accessorKey: "datasetSize",
    cell: ({ row }) => {
      const datasetSize = row.getValue("datasetSize") as number;
      return (
        <p className="text-sm text-zinc-950/90 dark:text-gray-400">
          {datasetSize}
        </p>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="">
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 !ring-0 focus:ring-0"
            >
              <MoreHorizontal className="h-4 w-4 " />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="right" className="w-[170px]">
            <DropdownMenuGroup className="gap-1 flex flex-col ">
              <div className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-red-50 dark:hover:bg-red-100/10 hover:text-accent-foreground ">
                <Puzzle className="size-3" />
                <span className="">Use Model</span>
              </div>

              <DropdownMenuItem>
                <Download className="size-3" />
                <span className="">Download Model</span>
              </DropdownMenuItem>

              <ConfirmModal
                description="Deleting this document is not reversible. Please be certain."
                onDelete={async () => {
                  window.location.reload();
                }}
              >
                <div className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-red-50 dark:hover:bg-red-100/10 hover:text-accent-foreground ">
                  <Trash2 className="h-3 w-3 ring-0 text-red-500 focus:ring-0" />
                  <span className="text-sm text-red-600">Delete Model</span>
                </div>
              </ConfirmModal>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
