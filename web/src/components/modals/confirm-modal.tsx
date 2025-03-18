import React, { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";

export const ConfirmModal = ({
  onDelete,
  children,
  description,
  className,
}: {
  onDelete: any;
  children?: ReactNode;
  description?: string;
  className?: string;
}) => {
  return (
    <AlertDialog>
      {
        <AlertDialogTrigger
          className={cn(className, "w-full")}
          //   className={cn(buttonVariants({ variant: "destructive" }))}
        >
          {children ?? (
            <Button size={"icon"} variant={"ghost"} className=" h-9">
              <Trash className="text-red-500" />
            </Button>
          )}
        </AlertDialogTrigger>
      }
      <AlertDialogContent className="p-6">
        <AlertDialogHeader className="">
          <AlertDialogTitle className="flex items-center">
            <Trash className="text-red-500 mr-2 size-4" /> Are you absolutely
            sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="max-w-[400px]">
            {description ?? "This action cannot be undone. "}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className=" ml-auto pt-1">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={onDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
