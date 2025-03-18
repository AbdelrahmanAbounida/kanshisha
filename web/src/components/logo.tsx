import { cn } from "@/lib/utils";
import { Infinity, InfinityIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({
  className,
  small = false,
}: {
  className?: string;
  small?: boolean;
}) => {
  return (
    <Link href="/" className="flex gap-1 items-center w-full  rounded-lg p-1">
      <div className="flex aspect-square size-5 items-center justify-center rounded-full bg-primary text-sidebar-primary-foreground">
        <InfinityIcon className="size-3.5 text-white" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium font-sans text-lg ">
          Neda<span className=" ">F</span>use
        </span>
      </div>
    </Link>
  );
};

export default Logo;
