'use client';

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  User,
  Mail,
  BadgeCheck,
  ShoppingCart,
  MapPin,
  Landmark,
  Star,
  Truck,
  Badge,
} from "lucide-react";
import { IOrderResponse, IUser } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type IReview = {
  id: string;
  productName: string;
  comment: string;
  rating: number;
};

const MotionCard = motion(Card);

const AdminUserProfile = ({
  user,
  orders,
  reviews,
}: {
  user: IUser;
  orders: IOrderResponse[];
  reviews: IReview[];
}) => {


  const lastOrder = orders[orders.length-1]

  const {shippingInfo, products, orderStatus, paymentStatus, totalPrice} = lastOrder

  function cn(...classes: (string | undefined | false)[]): string {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="w-full px-4 md:px-8 py-10 space-y-10">
      {/* User Info */}
      <MotionCard
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl border-none rounded-3xl shadow-lg bg-gradient-to-tr from-blue-50 to-white mx-auto"
      >
        <CardHeader className="flex items-center flex-col space-y-4">
          <Avatar className="w-24 h-24 border-4 border-blue-100 shadow-md">
            <AvatarImage src={""} alt={user.name} />
            <AvatarFallback className="bg-blue-100 text-blue-800 text-2xl">
              {user.name?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-bold text-slate-700">
            {user.name?.toUpperCase()}
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 pb-6">
          <InfoItem icon={<BadgeCheck size={18} />} label="Role" value={user.role} />
          <InfoItem icon={<Mail size={18} />} label="Email" value={user.email} />
          <InfoItem icon={<User size={18} />} label="Phone" value={"01777777"} />
        </CardContent>
      </MotionCard>

      {/* Order Summary */}
      <MotionCard
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-5xl rounded-3xl mx-auto border border-blue-100 shadow-sm bg-white"
      >
        <CardHeader>
          <CardTitle className="text-xl text-slate-800">Last Order History</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 pb-6">
          <InfoItem icon={<MapPin size={18} />} label="City" value={shippingInfo.shippingCity} />
          <InfoItem icon={<Landmark size={18} />} label="Address" value={shippingInfo.shippingAddress} />
          <InfoItem icon={<ShoppingCart size={18} />} label="Total Products" value={products.length} />
          <InfoItem icon={<Star size={18} />} label="Total Revenue" value={`$${totalPrice}`} />
         
          <InfoItem
  icon={<BadgeCheck size={18} />}
  label="Payment Status"
  value={
    <span className={`text-sm font-medium px-1 rounded-sm text-white${
      paymentStatus ? " bg-green-600" : "bg-yellow-700"
    }`}>
      {paymentStatus ? "Paid" : "Unpaid"}
    </span>
  }
/>

<InfoItem
  icon={<Truck size={18} />}
  label="Order Status"
  value={
    <span className={`text-sm font-medium bg-gray-200 px-1 rounded-sm ${
      orderStatus === "pending"
        ? "text-yellow-700"
        : orderStatus === "shipped"
        ? "text-blue-700"
        : orderStatus === "delivered"
        ? "text-green-700"
        : "text-red-700"
    }`}>
      {orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1)}
    </span>
  }
/>



        </CardContent>
      </MotionCard>

    
      <MotionCard
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-6xl mx-auto rounded-3xl border bg-white shadow-sm"
      >
        <CardHeader>
          <CardTitle className="text-xl text-slate-800">User Orders</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto px-4 pb-6">
          <table className="min-w-full text-sm text-slate-700">
            <thead>
              <tr className="text-left border-b border-slate-200">
                <th className="py-2 pr-4"></th>
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Total</th>
                <th className="py-2 pr-4">Order Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-blue-50 gap-y-1 transition-colors">
                  <td className="py-2 pr-4">{order._id}</td>
                  <td className="py-2 pr-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 pr-4">{order.orderStatus}</td>
                  <td className="py-2 pr-4">৳{order.totalPrice}</td>
                  <td className="py-2 pr-4"><Button><Link href={`/admin/orders/${order._id}`}>More</Link></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </MotionCard>

     
      <MotionCard
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-6xl mx-auto rounded-3xl border bg-white shadow-sm"
      >
        <CardHeader>
          <CardTitle className="text-xl text-slate-800">User Reviews</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-4 pb-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4 bg-slate-50 hover:bg-slate-100 transition-colors">
                <p className="font-semibold text-blue-700">{review.productName}</p>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
                <p className="text-sm text-yellow-600">Rating: {review.rating}/5</p>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">This user hasn't left any reviews yet.</p>
          )}
        </CardContent>
      </MotionCard>
    </div>
  );
};

export default AdminUserProfile;

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-start space-x-3">
    <div className="text-blue-600 mt-1">{icon}</div>
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-base font-medium text-slate-800 break-words">
        {value || "—"}
      </p>
    </div>
  </div>
);
