"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCart, orderSelector } from "@/redux/features/cartSlice";

import { useUser } from "@/context/UserContext";
import { Badge } from "@/components/ui/badge";
import { BadgeDollarSign } from "lucide-react";
import Image from "next/image";
import { createOrderWithPrescription } from "@/services/order";
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

        toast.success("Order is created successfully!", {duration:3000})

        dispatch(clearCart())

        router.push("/user/orders")
        
      } else {
        toast.error(res?.message,{duration:1400});
       
      }
    }

   
    } catch (err: any) {
      console.error(err);
    }

    
  }

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid  grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {products?.map((product) => (
              <div
                key={product.productId}
                className="border-b  bg-blue-50 p-2 rounded-md"
              >
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">
                  Quantity: {product.quantity}
                </p>
                <p className="text-sm">Price: ৳{product.price}</p>
                <p className="text-sm font-semibold">
                  Total: ৳{product.price * product.quantity}
                </p>
              </div>
            ))}
            <div></div>
            <div className="pt-4 border-t space-y-2">
              <p>
                <strong>Shipping Cost:</strong> ৳{shippingCost}
              </p>
              <p>
                <strong>Total:</strong> ৳
                {Number(totalPrice) + Number(shippingCost)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

     
      <div className="grid  grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>Name:</strong>
              <Badge>{user?.name.toUpperCase()}</Badge>
            </p>
            <p>
              <strong>Email:</strong>
              <Badge className="bg-primary text-sm">{user?.email}</Badge>
            </p>
          </CardContent>
        </Card>

       
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>Address:</strong> {shippingInfo?.shippingAddress}
            </p>
            <p>
              <strong>City:</strong> {shippingInfo?.shippingAddress}
            </p>
          </CardContent>
        </Card>

        {prescription && (
          <Card>
            <CardHeader>
              <CardTitle>Prescription</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                width={500}
                height={500}
                src={prescription}
                alt="Prescription"
                className="w-full max-w-sm rounded shadow"
              />
            </CardContent>
          </Card>
        )}

        <Card onClick={handleOrder} className="bg-accent flex justify-center items-center text-white hover:bg-accent cursor-pointer">
          <CardContent className="space-y-2 flex gap-2 font-semibold text-xl justify-center items-center">
            {
              prescription ? <>Review Prescription</> : <><BadgeDollarSign /> Pay Now</>
            }
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
