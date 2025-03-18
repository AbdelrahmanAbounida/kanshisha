import React from "react";
import { AIModelsTable } from "../tables/ai-models-table/data-table";

export const RecentModelsTable = () => {
  return (
    <div>
      {/* w-auto xl:max-w-5xl 2xl:max-w-7xl container mx-auto px-4 */}
      <AIModelsTable data={[]} className="" />
    </div>
  );
};
