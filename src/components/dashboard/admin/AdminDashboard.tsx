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
  Briefcase,
} from 'lucide-react';
import { IOrderResponse, IProduct, IUser, TMedicineResponse } from '@/types';
import { OrderStatusBar } from './OrderStatusBar';
import { ProductsCategoriesChart } from './ProductsCategoriesChart';
import { DashboardProductsTable } from './DashboardProductsTable';
import { Button } from '@/components/ui/button';

const AdminDashboard = ({orders, users, products}:{orders:IOrderResponse[], users:IUser[], products:TMedicineResponse[]}) => {

  const totalRevenue = orders?.filter(order => order.paymentStatus).reduce((sum,order) => order.totalPrice + sum ,0)

  const pendingOrders = orders?.filter(order => order.orderStatus === 'pending')
  const shippedOrders = orders?.filter(order => order.orderStatus === 'shipped')
  const deliveredOrders = orders?.filter(order => order.orderStatus === 'delivered')
  const cancelledOrders = orders?.filter(order => order.orderStatus === 'cancelled')
  const prescriptionReviews =  orders?.filter(order => !order.paymentStatus && order.prescription)

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
      <h1 className="text-3xl font-semibold text-center mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      
        <Card className="p-4 shadow-lg rounded-lg bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Total Products</h3>
              <p className="text-2xl">{products?.length}</p>
            </div>
            <Briefcase className="text-blue-600 w-8 h-8" />
          </div>
        </Card>

       
        <Card className="p-4 shadow-lg rounded-lg bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-2xl">{users.length}</p>
            </div>
            <Users className="text-purple-600 w-8 h-8" />
          </div>
        </Card>
      
        <Card className="p-4 shadow-lg rounded-lg bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Total Revenue</h3>
              <p className="text-2xl">${totalRevenue}</p>
            </div>
            <DollarSign className="text-green-600 w-8 h-8" />
          </div>
        </Card>

        <Card className="p-4 shadow-lg rounded-lg bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Total Orders</h3>
              <p className="text-2xl">{orders?.length}</p>
            </div>
            <ShoppingCart className="text-blue-600 w-8 h-8" />
          </div>
        </Card> 

        
        <div className="sm:col-span-2 lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <Card className="p-4 shadow-lg rounded-lg bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Pending</h3>
                <p className="text-2xl">{pendingOrders?.length}</p>
              </div>
              <Clock className="text-yellow-500 w-8 h-8" />
            </div>
          </Card>

          <Card className="p-4 shadow-lg rounded-lg bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Shipped</h3>
                <p className="text-2xl">{shippedOrders?.length}</p>
              </div>
              <Truck className="text-blue-400 w-8 h-8" />
            </div>
          </Card>

          <Card className="p-4 shadow-lg rounded-lg bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Delivered</h3>
                <p className="text-2xl">{deliveredOrders?.length}</p>
              </div>
              <CheckCircle2 className="text-green-600 w-8 h-8" />
            </div>
          </Card>

          <Card className="p-4 shadow-lg rounded-lg bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Cancelled</h3>
                <p className="text-2xl">{cancelledOrders?.length}</p>
              </div>
              <XCircle className="text-red-500 w-8 h-8" />
            </div>
          </Card>
        </div>

        <Card className="p-4 shadow-lg rounded-lg bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Due Payment</h3>
                <p className="text-2xl">{prescriptionReviews?.length}</p>
              </div>
              
            </div>
          </Card>
      
        </div>

        <div className='py-10'>
          <OrderStatusBar orderStatusData={orderStatusData} />
        </div>


     
      <div className='py-10'>
          <ProductsCategoriesChart products={products}/>
        </div>

<div className='py-10'>
<DashboardProductsTable products={products}/>

</div>

      </div>
 

  );
};

export default AdminDashboard;
