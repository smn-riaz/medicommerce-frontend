"use client";

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
  BadgeCheck,
  Mail,
  MapPin,
  ListOrdered,
  Pen,
  PenBox,
} from "lucide-react";
import { format } from "date-fns";
import { IOrderResponse, IUserResponse } from "@/types";
import Link from "next/link";

const orders = [
  {
    id: "order_001",
    products: [
      { name: "Paracetamol 500mg", quantity: 2 },
      { name: "Cough Syrup", quantity: 1 },
    ],
    createdAt: new Date().toISOString(),
  },
];

const reviews = [
  { title: "Very effective product!" },
  { title: "Good quality and fast delivery." },
];

// InfoItem
const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number | undefined;
}) => (
  <div className="flex items-start gap-3">
    <div className="text-blue-600 dark:text-blue-400 mt-1">{icon}</div>
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-base font-medium text-slate-800 dark:text-white break-words">
        {value || "—"}
      </p>
    </div>
  </div>
);

// Main Component
const UserProfile = ({
  orders,
  user
}:{orders:IOrderResponse[],
  user:IUserResponse
}) => {

  const lastOrder = orders[orders.length-1];



  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Header */}
      <div className="relative  flex justify-between items-center w-full rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400  shadow-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-white shadow-md">
            <AvatarImage src="https://github.com/shadcn.png" alt={user.name} />
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">{user.name}</h1>
            <p className="text-sm text-blue-100">{user.role}</p>
          </div>
        </div>

        <div>
          <Link href="/user/update-profile"><PenBox color="white" /></Link>
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel */}
        <div className="space-y-6">
          <Card className="p-3">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Profile Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <InfoItem icon={<BadgeCheck size={18} />} label="Role" value={user.role} />
              <InfoItem icon={<Mail size={18} />} label="Email" value={user.email} /> 
             {/* <InfoItem icon={<MapPin size={18} />} label="Joined" value={format(new Date(user.createdAt), "PPP")} /> */}
            </CardContent>
          </Card>

          <Card className="p-3">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <MapPin size={18} /> Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-md dark:text-muted-foreground">
                {lastOrder.shippingInfo.shippingAddress}
              </p>
              <p className="text-md dark:text-muted-foreground">
                {lastOrder.shippingInfo.shippingCity}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-3">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <ListOrdered size={18} /> Last Orders ({orders.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {lastOrder ? (
                <div className="text-sm dark:text-white">
                  <p className="font-semibold ">Last Order</p>
                  <div className="flex justify-between mt-1 flex-wrap gap-2">
                    <span className=" w-1/3 flex justify-between">{lastOrder.products[0].name} <span>৳{lastOrder.totalPrice}</span></span>
                
                    <span className="text-muted-foreground">
                      {lastOrder.products.length} item(s)
                    </span>

                   
                  </div>

                   <p className="text-right font-semibold text-blue-600 py-4"><Link href="/user/orders"><u>All Orders</u></Link></p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No orders placed yet.</p>
              )}
            </CardContent>
          </Card>

          <Card className="p-3">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                Reviews ({reviews.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {reviews.length > 0 ? (
                <ul className="list-disc pl-5 text-sm dark:text-white">
                  {reviews.map((r, i) => (
                    <li key={i}>{r.title}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No reviews submitted.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
