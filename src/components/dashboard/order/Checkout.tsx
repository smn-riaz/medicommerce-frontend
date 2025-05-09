"use client";

import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCart, orderSelector } from "@/redux/features/cartSlice";

import { useUser } from "@/context/UserContext";
import { Badge } from "@/components/ui/badge";
import { BadgeDollarSign } from "lucide-react";
import Image from "next/image";
import { createOrderWithOutPrescription, createOrderWithPrescription } from "@/services/order";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


const Checkout = () => {

  const orderInfo = useAppSelector(orderSelector);
  const router = useRouter()

  const dispatch = useAppDispatch()

  const { shippingInfo, shippingCost, totalPrice, prescription, products } =
    orderInfo;


  const { user, setIsLoading, isLoading } = useUser();
  

  const handleOrder = async() => {

    try {
    const orderedProductInfo = {
      userId:user?.id,
      name:user?.name, 
      email:user?.email,
      products,
      prescription,
      shippingInfo,
      shippingCost,
      totalPrice: Number(totalPrice + (shippingCost ?? 60)),
      prescriptionReviewStatus:"pending",
      orderStatus:"pending",
      paymentStatus:false
    }

   
  
    if(prescription){
      const res = await createOrderWithPrescription(orderedProductInfo);
  
      if (res?.success) {

        toast.success(res.message, {duration:3000})

        dispatch(clearCart())

        router.push("/user/orders")
        
      } else {
        toast.error(res?.message,{duration:1400});
       
      }
    } else {


      const res = await createOrderWithOutPrescription(orderedProductInfo)
  
      if (res?.success) {

        toast.success(res.message, {duration:3000})

        dispatch(clearCart())

        router.push(res?.data)
        
      } else {
        toast.error(res?.message,{duration:1400});
       
      }
    }

   
    } catch (err: any) {
      console.error(err);
    }

    
  }

  return (
<div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-8">
  <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center dark:text-white">Checkout</h1>

  {/* Grid: Order Summary + User Info, Shipping Info, Prescription */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Order Summary (2/3 width) */}
    <Card className="lg:col-span-2 shadow-md dark:bg-muted dark:text-white">
      <CardHeader>
        <CardTitle className="text-xl">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-4 py-2">
        {products?.map((product) => (
          <div
            key={product.productId}
            className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border dark:border-blue-800"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground dark:text-gray-400">Qty: {product.quantity}</p>
              </div>
              <div className="text-right">
                <p className="text-sm">Price: ৳{product.price}</p>
                <p className="font-semibold">Total: ৳{product.price * product.quantity}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-4 border-t border-border space-y-1">
          <div className="flex justify-between text-sm">
            <span>Shipping Cost</span>
            <span>৳{shippingCost}</span>
          </div>
          <div className="flex justify-between text-md font-semibold">
            <span>Total</span>
            <span>৳{Number(totalPrice) + Number(shippingCost)}</span>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Right Column (User, Shipping, Prescription) */}
    <div className="space-y-6">
      {/* User Info */}
      <Card className="dark:bg-muted dark:text-white">
        <CardHeader>
          <CardTitle>User Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 px-4 py-2">
          <p><strong>Name:</strong> <Badge>{user?.name?.toUpperCase()}</Badge></p>
          <p><strong>Email:</strong> <Badge className="bg-primary text-sm">{user?.email}</Badge></p>
        </CardContent>
      </Card>

      {/* Shipping Info */}
      <Card className="dark:bg-muted dark:text-white">
        <CardHeader>
          <CardTitle>Shipping Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 px-4 py-2">
          <p><strong>Address:</strong> {shippingInfo?.shippingAddress}</p>
          <p><strong>City:</strong> {shippingInfo?.shippingCity}</p>
        </CardContent>
      </Card>

      {/* Prescription */}
      {prescription && (
        <Card className="dark:bg-muted dark:text-white">
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

  {/* Pay Now / Review Button */}
  <div className="mt-8">
    <Card
      onClick={handleOrder}
      className="cursor-pointer bg-green-500 hover:bg-green-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white transition rounded-lg shadow-md"
    >
      <CardContent className="py-6 text-center font-semibold text-xl flex justify-center items-center gap-2">
        {prescription ? (
          <>Review Prescription</>
        ) : (
          <>
            <BadgeDollarSign /> Pay Now
          </>
        )}
      </CardContent>
    </Card>
  </div>
</div>


  );
};

export default Checkout;
