"use client";

import React from "react";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { MMTable } from "@/components/shared/dashboard/MMTable";
import { updateOrderStatus, updatePrescriptionReviewStatus } from "@/services/order";
import { toast } from "sonner";
import { HoverPrescription } from "@/components/shared/dashboard/admin/hoverPrescription/HoverCard";

interface IShippingInfo {
  shippingAddress: string;
  shippingCity: string;
}

interface IProduct {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface IOrderResponse {
  _id: string;
  name:string
  email:string
  userId: string;
  createdAt: string;
  updatedAt: string;
  prescription: string;
  prescriptionReviewStatus: "pending" | "ok" | "cancelled";
  orderStatus: "pending" | "shipped" | "delivered" | "cancelled";
  paymentStatus: boolean;
  products: IProduct[];
  shippingCost: number;
  shippingInfo: IShippingInfo;
  status: "pending" | "completed" | "cancelled";
  totalPrice: number;
  __v: number;
}

interface ManageOrdersProps {
  data: IOrderResponse[];
}

const ManagePrescriptionReview: React.FC<ManageOrdersProps> = ({ data }) => {



  const handlePrescriptionStatusChange = async (orderId: string, newStatus: string) => {
    try {

      const res = await updatePrescriptionReviewStatus(orderId, newStatus);

      if (res.success) {
        toast.success("Prescription review status updated", { duration: 1200 });
      } else {
        toast.error(res.message, { duration: 1200 });
      }
    } 
    catch (err) {
      toast.error("Failed to update prescription status", { duration: 1200 });
    }
  };

  const columns: ColumnDef<IOrderResponse>[] = [
    {
      accessorKey: "prescription",
      header: "Prescription",
      cell: ({ row }) => (
        <div className="w-20 h-20 overflow-hidden rounded-md border">
          <HoverPrescription prescription={row.original.prescription} products={row.original.products}>
          
          </HoverPrescription>
        </div>
      ),
    },
    {
      accessorKey: "prescriptionReviewStatus",
      header: "Review Status",
      cell: ({ row }) => (
        <Select
          defaultValue={row.original.prescriptionReviewStatus}
          onValueChange={(value) =>
            handlePrescriptionStatusChange(row.original._id, value)
          }
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="ok">OK</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      accessorKey: "orderStatus",
      header: "Order Status",
      cell: ({ row }) => {
        const status = row.original.orderStatus;
    
        const colorMap: Record<string, string> = {
          pending: "bg-orange-500 text-white",
          shipped: "bg-blue-500 text-white",
          delivered: "bg-green-500 text-white",
          cancelled: "bg-red-500 text-white",
        };
    
        const colorClass = colorMap[status] || "bg-gray-500 text-white";
    
        return (
          <Badge className={colorClass}>
            {status?.toUpperCase()}
          </Badge>
        );
      },
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment",
      cell: ({ row }) =>
        row.original.paymentStatus ? (
          <Badge variant="default" className="bg-green-600">Paid</Badge>
        ) : (
          <Badge variant="destructive">Unpaid</Badge>
        ),
    },
    {
      accessorKey: "shippingCost",
      header: "Shipping Cost",
      cell: ({ row }) => <span>৳{row.original.shippingCost}</span>,
    },
    {
      accessorKey: "totalPrice",
      header: "Total Price",
      cell: ({ row }) => <span>৳{row.original.totalPrice}</span>,
    },
    {
      accessorKey: "shippingInfo",
      header: "Shipping Address",
      cell: ({ row }) => (
        <div>
          <p>{row.original.shippingInfo.shippingAddress}</p>
          <p className="text-muted-foreground text-sm">
            {row.original.shippingInfo.shippingCity}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "products",
      header: "Products",
      cell: ({ row }) => (
        <div className="space-y-1">
          {row.original.products.map((product, index) => (
            <div
              key={index}
              className="text-sm p-1 rounded bg-muted border border-border"
            >
              <p>
                <span className="font-medium">{product.name}</span> — Qty:{" "}
                {product.quantity}, ৳{product.price}
              </p>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Order - Prescription Review</h2>
      <MMTable data={data} columns={columns} />
    </div>
  );
};

export default ManagePrescriptionReview;
