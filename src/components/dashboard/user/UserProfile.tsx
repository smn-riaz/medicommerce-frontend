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
  PenBox,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { IOrderResponse, IUser, TReviewResponse } from "@/types";

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

const UserProfile = ({
  orders,
  user,
  reviews,
}: {
  orders: IOrderResponse[];
  user: IUser & { iat: string };
  reviews: TReviewResponse[];
}) => {
  const lastOrder = orders[orders.length - 1];
  const lastLogin = user.iat ? new Date(Number(user.iat) * 1000) : null;

  return (
    <div className=" space-y-8">
      {/* Header */}
      <div className="relative flex justify-between items-center w-full rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 shadow-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
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
          <Link href="/user/update-profile">
            <PenBox color="white" />
          </Link>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Panel */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-3">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Profile Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <InfoItem icon={<BadgeCheck size={18} />} label="Role" value={user.role} />
              <InfoItem icon={<Mail size={14} />} label="Email" value={user.email} />
              <InfoItem
                icon={<MapPin size={18} />}
                label="Last Logged In"
                value={lastLogin ? format(lastLogin, "PPPpp") : "Unknown"}
              />
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
                {lastOrder?.shippingInfo?.shippingAddress || "Not Available"}
              </p>
              <p className="text-md dark:text-muted-foreground">
                {lastOrder?.shippingInfo?.shippingCity || ""}
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
                  <p className="font-semibold">Last Order</p>
                  <div className="flex justify-between mt-1 flex-wrap gap-2">
                    <span className="w-1/3 flex justify-between">
                      {lastOrder.products[0].name}
                      <span>৳{lastOrder.totalPrice}</span>
                    </span>
                    <span className="text-muted-foreground">
                      {lastOrder.products.length} item(s)
                    </span>
                  </div>
                  <p className="text-right font-semibold text-blue-600 py-4">
                    <Link href="/user/orders">
                      <u>All Orders</u>
                    </Link>
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No orders placed yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reviews Section - Full Width */}
      <div className="col-span-full">
        <Card className="p-4 shadow-md rounded-2xl border dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              Reviews ({reviews.length})
            </CardTitle>
          </CardHeader>

          <CardContent>
            {reviews.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {reviews.map((r, i) => (
                  <div
                    key={i}
                    className="border border-muted rounded-lg p-4 bg-muted/20 dark:bg-muted/40 transition hover:shadow-md"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold text-base">{r.title}</h3>
                      <span className="text-yellow-500 text-sm">
                        {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-2 line-clamp-3">
                      {r.description}
                    </p>

                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      <span>
                        By <strong>{r.userId?.name?.trim() || "Anonymous"}</strong>
                      </span>
                      <br />
                      <span>{new Date(r.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No reviews submitted.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
