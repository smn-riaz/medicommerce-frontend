"use client";

import { TMedicineResponse } from "@/types";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  PieLabelRenderProps,
} from "recharts";

const COLORS = [
  "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6",
  "#ec4899", "#14b8a6", "#f43f5e", "#6366f1"
];

// ✅ Custom label function to show the name/type
const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  name,
}: PieLabelRenderProps & { name?: string }) => {
  const RADIAN = Math.PI / 180;
  const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
  const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
  const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
    >
      {name}
    </text>
  );
};

export function ProductsCategoriesChart({ products }: { products: TMedicineResponse[] }) {
  const categoryData = Object.values(
    products.reduce((acc, product) => {
      const type = product.type;
      if (!acc[type]) {
        acc[type] = { name: type, value: 0 };
      }
      acc[type].value += 1;
      return acc;
    }, {} as Record<string, { name: string; value: number }>)
  );

  return (
    <div className="w-full h-96 p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-md">
      <h2 className="text-2xl text-center font-semibold mb-4">Products by Type</h2>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
            labelLine={false}
            label={renderCustomLabel}
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
