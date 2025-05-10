"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  clearCart,
  orderSelector,
} from "@/redux/features/cartSlice";
import { useUser } from "@/context/UserContext";
import { Badge } from "@/components/ui/badge";
import { BadgeDollarSign, ShoppingCart } from "lucide-react";
import Image from "next/image";
import {
  createOrderWithOutPrescription,
  createOrderWithPrescription,
} from "@/services/order";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Checkout = () => {
  const orderInfo = useAppSelector(orderSelector);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    shippingInfo,
    shippingCost = 60,
    totalPrice = 0,
    prescription,
    products = [],
  } = orderInfo;
  const { user, setIsLoading, isLoading } = useUser();

  const handleOrder = async () => {
    if (!products.length) return;

    try {
      const orderedProductInfo = {
        userId: user?.id,
        name: user?.name,
        email: user?.email,
        products,
        prescription,
        shippingInfo,
        shippingCost,
        totalPrice: Number(totalPrice + shippingCost),
        prescriptionReviewStatus: "pending",
        orderStatus: "pending",
        paymentStatus: false,
      };

      const res = prescription
        ? await createOrderWithPrescription(orderedProductInfo)
        : await createOrderWithOutPrescription(orderedProductInfo);

      if (res?.success) {
        toast.success(res.message, { duration: 3000 });
        dispatch(clearCart());
        router.push(prescription ? "/user/orders" : res?.data);
      } else {
        toast.error(res?.message, { duration: 1400 });
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const isCartEmpty = products.length === 0;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-10 p-3">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center dark:text-white">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-3">
        {/* Order Summary */}
        <Card className="lg:col-span-2 shadow-lg dark:bg-muted dark:text-white min-h-[200px] p-3">
          <CardHeader>
            <CardTitle className="text-xl">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-4 py-2">
            {isCartEmpty ? (
              <div className="text-center text-muted-foreground py-10 p-3">
                <ShoppingCart className="mx-auto mb-4 w-10 h-10 text-gray-400" />
                <p className="text-lg mb-4">Your cart is empty. Add some products to proceed.</p>
                <Button
                  variant="default"
                  className="mx-auto"
                  onClick={() => router.push("/shop")}
                >
                  Browse Products
                </Button>
              </div>
            ) : (
              <>
                {products.map((product) => (
                  <div
                    key={product.productId}
                    className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border dark:border-blue-800 p-3"
                  >
                    <div className="flex justify-between items-center p-3">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                          Qty: {product.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">Price: ৳{product.price}</p>
                        <p className="font-semibold">
                          Total: ৳{product.price * product.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-border space-y-1 p-3">
                  <div className="flex justify-between text-sm">
                    <span>Shipping Cost</span>
                    <span>৳{shippingCost}</span>
                  </div>
                  <div className="flex justify-between text-md font-semibold">
                    <span>Total</span>
                    <span>৳{Number(totalPrice) + Number(shippingCost)}</span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="space-y-6 p-3">
          <Card className="dark:bg-muted dark:text-white p-3">
            <CardHeader>
              <CardTitle>User Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 px-4 py-2">
              <p>
                <strong>Name:</strong>{" "}
                <Badge>{user?.name?.toUpperCase()}</Badge>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <Badge className="bg-primary text-sm">{user?.email}</Badge>
              </p>
            </CardContent>
          </Card>

          <Card className="dark:bg-muted dark:text-white p-3">
            <CardHeader>
              <CardTitle>Shipping Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 px-4 py-2">
              <p>
                <strong>Address:</strong> {shippingInfo?.shippingAddress}
              </p>
              <p>
                <strong>City:</strong> {shippingInfo?.shippingCity}
              </p>
            </CardContent>
          </Card>

          {prescription && (
            <Card className="dark:bg-muted dark:text-white p-3">
              <CardHeader>
                <CardTitle>Prescription</CardTitle>
              </CardHeader>
              <CardContent className="px-4 py-2">
                <Image
                  width={500}
                  height={500}
                  src={prescription}
                  alt="Prescription"
                  className="w-full max-w-xs mx-auto rounded-lg shadow dark:shadow-lg"
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Pay Now Button */}
      <div className="flex justify-center p-3">
        <Button
          onClick={handleOrder}
          disabled={isCartEmpty || isLoading}
          className={`w-1/2 px-10 py-4 text-lg font-semibold rounded-xl transition shadow-lg ${
            isCartEmpty
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {prescription ? "Review Prescription" : (
            <>
              <BadgeDollarSign className="mr-2 h-5 w-5" /> Pay Now
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
