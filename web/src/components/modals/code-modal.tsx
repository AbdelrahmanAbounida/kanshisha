import React, { ReactNode } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  CheckIcon,
  CircleX,
  Copy,
  Eye,
  Loader,
  CodeXml,
  Zap,
} from "lucide-react";
import { ModelCode } from "@/constants/demo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { CodeViewer2 } from "../code/code-viewer2";
import { CodeViewer } from "../code/code-viewer";

export const CodeModal = ({
  code,
  children,
  className,
}: {
  code: ModelCode;
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ?? (
          //   <Button variant="ghost">
          //     <Eye className="size-4" />{" "}
          //   </Button>
          <Button
            className="inline-flex items-center justify-center rounded-lg text-sm ring-offset-background outline-none disabled:pointer-events-none disabled:opacity-25 gap-1.5 text-white dark:text-zinc-900 bg-zinc-900 hover:bg-zinc-700 dark:bg-white/90 dark:hover:bg-white/70 min-h-[32px] h-8 py-1.5 px-3"
            type="submit"
          >
            <CodeXml className="text-white w-4" />
            View Code
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-5xl border gap-0">
        <CodeViewer code={code} />

        <DialogFooter className="flex items-center justify-end mt-5">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="h-8 ">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
