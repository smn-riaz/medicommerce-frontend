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

  // Create a formatter to display `Category – Count`
  const renderLegendText = (value: string) => {
    const item = categoryData.find((c) => c.name === value);
    return `${value} – ${item?.value ?? 0}`;
  };

  return (
    <div className="w-full h-96 p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-md">
      <h2 className="text-2xl text-center font-semibold mb-4">Products by Type</h2>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            cx="40%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
            labelLine={false}
            label={false}
          >
            {categoryData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconType="circle"
            formatter={renderLegendText}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
