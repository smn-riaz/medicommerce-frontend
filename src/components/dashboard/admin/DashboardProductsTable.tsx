"use client";

import { TMedicineResponse } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DashboardProductsTable({ products }: { products: TMedicineResponse[] }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-md w-full overflow-auto">
      <h2 className="text-2xl text-center font-semibold mb-4">Products Summary</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[150px]">Name</TableHead>
            <TableHead className="min-w-[100px]">Type</TableHead>
            <TableHead className="min-w-[100px]">Price</TableHead>
            <TableHead className="min-w-[100px]">Quantity</TableHead>
            <TableHead className="min-w-[150px]">Expire Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.type}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                {new Date(product.expireDate).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center"><Button className="w-1/2 my-2 mt-4"><Link href="/admin/medicines">See More</Link></Button></div>
    </div>
  );
}
