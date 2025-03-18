"use client";
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const version3Losses = [
  {
    epoch: 0,
    losses: 0.945,
  },
  {
    epoch: 1,
    losses: 0.6944,
  },
  {
    epoch: 2,
    losses: 0.7943,
  },
  {
    epoch: 3,
    losses: 0.8942,
  },
  {
    epoch: 4,
    losses: 0.1941,
  },
  {
    epoch: 5,
    losses: 0.394,
  },
  {
    epoch: 6,
    losses: 0.2939,
  },
  {
    epoch: 7,
    losses: 0.1938,
  },
  {
    epoch: 8,
    losses: 0.5937,
  },
  {
    epoch: 9,
    losses: 0.4936,
  },
  {
    epoch: 10,
    losses: 0.3935,
  },
  {
    epoch: 11,
    losses: 0.904,
  },
  {
    epoch: 12,
    losses: 0.9133,
  },
  {
    epoch: 13,
    losses: 0.3932,
  },
  {
    epoch: 14,
    losses: 0.2931,
  },
  {
    epoch: 15,
    losses: 0.193,
  },
  {
    epoch: 16,
    losses: 0.0929,
  },
  {
    epoch: 17,
    losses: 0.0928,
  },
];

const version2Losses = [
  { epoch: 0, losses: 0.923 },
  { epoch: 1, losses: 0.456 },
  { epoch: 2, losses: 0.876 },
  { epoch: 3, losses: 0.342 },
  { epoch: 4, losses: 0.789 },
  { epoch: 5, losses: 0.176 },
  { epoch: 6, losses: 0.623 },
  { epoch: 7, losses: 0.298 },
  { epoch: 8, losses: 0.945 },
  { epoch: 9, losses: 0.213 },
  { epoch: 10, losses: 0.657 },
  { epoch: 11, losses: 0.189 },
  { epoch: 12, losses: 0.812 },
  { epoch: 13, losses: 0.276 },
  { epoch: 14, losses: 0.698 },
  { epoch: 15, losses: 0.092 },
  { epoch: 16, losses: 0.743 },
  { epoch: 17, losses: 0.154 },
];

const version1Losses = [
  { epoch: 0, losses: 0.843 },
  { epoch: 1, losses: 0.823 },
  { epoch: 2, losses: 0.567 },
  { epoch: 3, losses: 0.634 },
  { epoch: 4, losses: 0.989 },
  { epoch: 5, losses: 0.301 },
  { epoch: 6, losses: 0.254 },
  { epoch: 7, losses: 0.432 },
  { epoch: 8, losses: 0.597 },
  { epoch: 9, losses: 0.1276 },
  { epoch: 10, losses: 0.0589 },
  { epoch: 11, losses: 0.1298 },
  { epoch: 12, losses: 0.3734 },
  { epoch: 13, losses: 0.4156 },
  { epoch: 14, losses: 0.845 },
  { epoch: 15, losses: 0.5234 },
  { epoch: 16, losses: 0.1763 },
  { epoch: 17, losses: 0.0189 },
];

const chartConfig = {
  losses: {
    label: "Losses",
    color: "#625FFF",
  },
} satisfies ChartConfig;

export function RecentModelsLossesChart() {
  const [version, setVersion] = React.useState("version3");

  const filteredData = React.useMemo(() => {
    if (version === "version1") return version1Losses;
    if (version === "version2") return version2Losses;
    if (version === "version3") return version3Losses;
    return version3Losses;
  }, [version]);

  return (
    <Card className="flex-1 w-full lg:min-w-[500px] !shadow-none border-zinc-200/70">
      <CardHeader className="flex items-center gap-2 space-y-0  py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle> Models Losses</CardTitle>
          <CardDescription>
            Recent Model Losses View over training epochs
          </CardDescription>
        </div>
        <Select value={version} onValueChange={(val) => setVersion(val)}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto border-zinc-200/80 !ring-0 focus:ring-0"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem
              value="version3"
              className="rounded-lg hover:!bg-zinc-100 focus:!bg-zinc-100"
            >
              Model Version 3
            </SelectItem>
            <SelectItem value="version2" className="rounded-lg">
              Model Version 2
            </SelectItem>
            <SelectItem value="version1" className="rounded-lg">
              Model Version 1
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[270px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillLosses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-losses)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-losses)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              className="border-gray-100"
              stroke="#F0F1F1"
            />
            <XAxis
              dataKey="epoch"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return value;
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    console.log({ value });
                    return `${value}`;
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="losses"
              type="natural"
              fill="url(#fillLosses)"
              stroke="#625FFF"
            />
            {/* <ChartLegend content={<ChartLegendContent />} /> */}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
