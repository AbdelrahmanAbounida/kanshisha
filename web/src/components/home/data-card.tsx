import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Database, LucideIcon } from "lucide-react";

interface DataCardProps {
  title: string;
  description: string;
  value: number;
  icon: ReactNode;
}

export const DataCard = ({
  title,
  description,
  value,
  icon,
}: DataCardProps) => {
  return (
    <Card className="shadow-none  border-accent-foreground/20 flex-1 min-w-[300px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
          {/* Dataset Size */}
        </CardTitle>

        {/* <Database className='' /> */}
        {icon}
      </CardHeader>
      <CardContent className="mt-4">
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {description}
          {/* Size of Dataset used for training AI Models */}
        </p>
      </CardContent>
    </Card>
  );
};
