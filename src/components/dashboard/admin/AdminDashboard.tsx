'use client'
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import {
  ShoppingCart,
  DollarSign,
  Users,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

const AdminDashboard = () => {
  const [totalOrders, setTotalOrders] = useState(120);
  const [totalRevenue, setTotalRevenue] = useState(5000);
  const [totalUsers, setTotalUsers] = useState(150);
  const [orderStatuses, setOrderStatuses] = useState({
    pending: 20,
    shipped: 50,
    delivered: 40,
    cancelled: 10,
  });
  const [duePayments, setDuePayments] = useState(2000);



  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Orders */}
        <Card className="p-4 shadow-lg rounded-lg bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Total Orders</h3>
              <p className="text-2xl">{totalOrders}</p>
            </div>
            <ShoppingCart className="text-blue-600 w-8 h-8" />
          </div>
        </Card>

        {/* Total Revenue */}
        <Card className="p-4 shadow-lg rounded-lg bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Total Revenue</h3>
              <p className="text-2xl">${totalRevenue}</p>
            </div>
            <DollarSign className="text-green-600 w-8 h-8" />
          </div>
        </Card>

        {/* Total Users */}
        <Card className="p-4 shadow-lg rounded-lg bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <Users className="text-purple-600 w-8 h-8" />
          </div>
        </Card>

        {/* Order Statuses */}
        <div className="sm:col-span-2 lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <Card className="p-4 shadow-lg rounded-lg bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Pending</h3>
                <p className="text-2xl">{orderStatuses.pending}</p>
              </div>
              <Clock className="text-yellow-500 w-8 h-8" />
            </div>
          </Card>

          <Card className="p-4 shadow-lg rounded-lg bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Shipped</h3>
                <p className="text-2xl">{orderStatuses.shipped}</p>
              </div>
              <Truck className="text-blue-400 w-8 h-8" />
            </div>
          </Card>

          <Card className="p-4 shadow-lg rounded-lg bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Delivered</h3>
                <p className="text-2xl">{orderStatuses.delivered}</p>
              </div>
              <CheckCircle2 className="text-green-600 w-8 h-8" />
            </div>
          </Card>

          <Card className="p-4 shadow-lg rounded-lg bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Cancelled</h3>
                <p className="text-2xl">{orderStatuses.cancelled}</p>
              </div>
              <XCircle className="text-red-500 w-8 h-8" />
            </div>
          </Card>
        </div>

        <Card className="p-4 shadow-lg rounded-lg bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Pending Payments</h3>
                <p className="text-2xl">10</p>
              </div>
              <DollarSign className="text-red-500 w-8 h-8" />
            </div>
          </Card>
      
        </div>
 
    </div>
  );
};

export default AdminDashboard;
