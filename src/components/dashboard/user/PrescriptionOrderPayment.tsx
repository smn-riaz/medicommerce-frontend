"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSpecificOrder, paymentPrescriptionOrder } from "@/services/order";
import { BadgeDollarSign } from "lucide-react";
import Image from "next/image";

const PrescriptionOrderPayment = ({ order }: { order: IOrderResponse }) => {
  const { _id, shippingInfo, shippingCost, totalPrice, products, prescription } = order;

  const handlePayment = async() => {
//    const res = await paymentPrescriptionOrder(_id)
    console.log("Paying for Order ID:", _id);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Order Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {products?.map((product: IProduct) => (
              <div
                key={product.productId}
                className="border-b bg-blue-50 p-2 rounded-md"
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

            <div className="pt-4 border-t space-y-2">
              <p>
                <strong>Shipping Cost:</strong> ৳{shippingCost}
              </p>
              <p>
                <strong>Total:</strong> ৳{Number(totalPrice) + Number(shippingCost)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

  
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
      
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>Address:</strong> {shippingInfo?.shippingAddress}
            </p>
            <p>
              <strong>City:</strong> {shippingInfo?.shippingCity}
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
                alt="Prescription Image"
                className="w-full max-w-sm rounded shadow"
              />
            </CardContent>
          </Card>
        )}

     
        <Card
          onClick={handlePayment}
          className="bg-green-600 text-white hover:bg-green-700 transition cursor-pointer flex justify-center items-center"
        >
          <CardContent className="flex gap-2 font-semibold text-xl justify-center items-center">
             <BadgeDollarSign /> Pay Now
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrescriptionOrderPayment;
