"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  ShoppingCart,
  DollarSign,
  Users,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  Briefcase,
} from "lucide-react";
import { IOrderResponse, IProduct, IUser, TMedicineResponse } from "@/types";
import { OrderStatusBar } from "./OrderStatusBar";
import { ProductsCategoriesChart } from "./ProductsCategoriesChart";
import { DashboardProductsTable } from "./DashboardProductsTable";
import { Button } from "@/components/ui/button";

const AdminDashboard = ({
  orders,
  users,
  products,
}: {
  orders: IOrderResponse[];
  users: IUser[];
  products: TMedicineResponse[];
}) => {
  const totalRevenue = orders
    ?.filter((order) => order.paymentStatus)
    .reduce((sum, order) => order.totalPrice + sum, 0);

  const pendingOrders = orders?.filter(
    (order) => order.orderStatus === "pending"
  );
  const shippedOrders = orders?.filter(
    (order) => order.orderStatus === "shipped"
  );
  const deliveredOrders = orders?.filter(
    (order) => order.orderStatus === "delivered"
  );
  const cancelledOrders = orders?.filter(
    (order) => order.orderStatus === "cancelled"
  );
  const prescriptionReviews = orders?.filter(
    (order) => !order.paymentStatus && order.prescription
  );

  const [duePayments, setDuePayments] = useState(2000);

  const orderStatusData = [
    { name: "Pending", value: pendingOrders.length },
    { name: "Shipped", value: shippedOrders.length },
    { name: "Delivered", value: deliveredOrders.length },
    { name: "Cancelled", value: cancelledOrders.length },
    { name: "Due Payment", value: prescriptionReviews?.length },
  ];

  return (
    <div className="container mx-auto p-6">
    <h1 className="text-3xl font-semibold text-center mb-8 text-gray-900 dark:text-gray-100">
      Admin Dashboard
    </h1>
  
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Total Products */}
      <Card className="p-4 shadow-lg rounded-lg bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Total Products
            </h3>
            <p className="text-2xl text-gray-900 dark:text-gray-50">{products?.length}</p>
          </div>
          <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
      </Card>
  
      {/* Total Users */}
      <Card className="p-4 shadow-lg rounded-lg bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Total Users
            </h3>
            <p className="text-2xl text-gray-900 dark:text-gray-50">{users.length}</p>
          </div>
          <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
        </div>
      </Card>
  
      {/* Total Revenue */}
      <Card className="p-4 shadow-lg rounded-lg bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Total Revenue
            </h3>
            <p className="text-2xl text-gray-900 dark:text-gray-50">${totalRevenue}</p>
          </div>
          <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
      </Card>
  
      {/* Total Orders */}
      <Card className="p-4 shadow-lg rounded-lg bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Total Orders
            </h3>
            <p className="text-2xl text-gray-900 dark:text-gray-50">{orders?.length}</p>
          </div>
          <ShoppingCart className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
      </Card>
  
      {/* Order Status Breakdown */}
      <div className="sm:col-span-2 lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {/* Pending */}
        <Card className="p-4 shadow-lg rounded-lg bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Pending
              </h3>
              <p className="text-2xl text-gray-900 dark:text-gray-50">
                {pendingOrders?.length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500 dark:text-yellow-400" />
          </div>
        </Card>
  
        {/* Shipped */}
        <Card className="p-4 shadow-lg rounded-lg bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Shipped
              </h3>
              <p className="text-2xl text-gray-900 dark:text-gray-50">
                {shippedOrders?.length}
              </p>
            </div>
            <Truck className="w-8 h-8 text-blue-400 dark:text-blue-300" />
          </div>
        </Card>
  
        {/* Delivered */}
        <Card className="p-4 shadow-lg rounded-lg bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Delivered
              </h3>
              <p className="text-2xl text-gray-900 dark:text-gray-50">
                {deliveredOrders?.length}
              </p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </Card>
  
        {/* Cancelled */}
        <Card className="p-4 shadow-lg rounded-lg bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Cancelled
              </h3>
              <p className="text-2xl text-gray-900 dark:text-gray-50">
                {cancelledOrders?.length}
              </p>
            </div>
            <XCircle className="w-8 h-8 text-red-500 dark:text-red-400" />
          </div>
        </Card>
      </div>
  
      {/* Due Payment */}
      <Card className="p-4 shadow-lg rounded-lg bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Due Payment
            </h3>
            <p className="text-2xl text-gray-900 dark:text-gray-50">
              {prescriptionReviews?.length}
            </p>
          </div>
        </div>
      </Card>
    </div>
  
    {/* Charts & Tables */}
    <div className="py-10">
      <OrderStatusBar orderStatusData={orderStatusData} />
    </div>
  
    <div className="py-10">
      <ProductsCategoriesChart products={products} />
    </div>
  
    <div className="py-10">
      <DashboardProductsTable products={products} />
    </div>
  </div>
  
  );
};

export default AdminDashboard;
