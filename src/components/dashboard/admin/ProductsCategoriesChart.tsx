"use client";

import { TMedicineResponse } from "@/types";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
];

export function ProductsCategoriesChart({ products }: { products: TMedicineResponse[] }) {
  // Categorize products by type
  const categoryData = Object.values(
    products.reduce((acc, product) => {
      const type = product.type;
      if (!acc[type]) {
        acc[type] = { name: type, value: 0 };
      }
      acc[type].value += 1;
      return acc;
    }, {} as Record<string, { name: string; value: number }>),
  );

  // Formatter for the Legend text
  const renderLegendText = (value: string) => {
    const item = categoryData.find((c) => c.name === value);
    return `${value} – ${item?.value ?? 0}`;
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden">
      {/* Pie Chart */}
      <div className="w-full sm:w-1/2 h-[20rem] sm:h-96 mb-6 sm:mb-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={50}
              labelLine={false}
              label={false}
            >
              {categoryData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="w-full sm:w-1/2 flex justify-center sm:justify-start">
        <ul className="space-y-3 text-sm text-gray-800 dark:text-gray-200">
          {categoryData.map((entry, index) => (
            <li key={`legend-${index}`} className="flex items-center gap-3">
              <span
                className="w-4 h-4 rounded-full inline-block"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              <span>{entry.name} ({entry.value})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
