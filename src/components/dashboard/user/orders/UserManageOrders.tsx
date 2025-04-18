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
import { updateOrderStatus } from "@/services/order";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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

const UserManageOrders: React.FC<ManageOrdersProps> = ({ data }) => {
  const router = useRouter();

  const handlePayment = (id: string) => {
    router.push(`/user/orders/${id}`);
  };

  const handleOrderStatusChange = async (
    orderId: string,
    newStatus: string
  ) => {
    try {
      const res = await updateOrderStatus(orderId, newStatus);
      if (res.success) {
        toast("Order status updated", { duration: 1200 });
      } else {
        toast(res.message, { duration: 1200 });
      }
    } catch (err) {
      toast("Failed to update order status", { duration: 1200 });
    }
  };

  const columns: ColumnDef<IOrderResponse>[] = [
    {
      accessorKey: "prescription",
      header: "Prescription",
      cell: ({ row }) => (
        <div
          className={`w-20 h-20 overflow-hidden rounded-md ${
            row.original.prescription ? "border" : ""
          }`}
        >
          {row.original.prescription && (
            <Image
              src={row.original.prescription}
              alt="Prescription"
              width={80}
              height={80}
              className="object-cover"
            />
          )}
        </div>
      ),
    },
    {
      accessorKey: "prescriptionReviewStatus",
      header: "Prescription Review",
      cell: ({ row }) => {
        const status = row.original.prescriptionReviewStatus;
        const color =
          status === "ok" ? "green" : status === "cancelled" ? "red" : "yellow";

        return (
          <>
            {row.original.prescription && (
              <>
                {row.original.prescriptionReviewStatus === "ok" &&
                !row.original.paymentStatus ? (
                  <div className="text-center flex justify-center items-center gap-1">
                  <Badge
                  className={`bg-${color}-100 text-${color}-600 border border-${color}-300`}> {status.toUpperCase()}</Badge> <br />
                  <Button
                    className="px-1 bg-green-700 hover:bg-green-700 cursor-pointer"
                    onClick={() => handlePayment(row.original._id)}
                  >
                    Make Payment
                  </Button>
                  </div>
                ) : (
                  <Badge
                    className={`bg-${color}-100 text-${color}-600 border border-${color}-300`}
                  >
                    {status.toUpperCase()}
                  </Badge>
                )}
              </>
            )}
          </>
        );
      },
    },
    {
      accessorKey: "orderStatus",
      header: "Order Status",
      cell: ({ row }) => <Badge>{row.original.orderStatus.toUpperCase()}</Badge>,
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment",
      cell: ({ row }) =>
        row.original.paymentStatus ? (
          <Badge variant="default">Paid</Badge>
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
      <h2 className="text-2xl font-semibold mb-4">Manage Orders</h2>
      <MMTable data={data} columns={columns} />
    </div>
  );
};

export default UserManageOrders;
