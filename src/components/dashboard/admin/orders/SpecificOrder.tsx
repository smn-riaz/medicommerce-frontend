



"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { IOrderResponse } from "@/components/dashboard/admin/prescription/ManagePrescriptionsReview";
import { getSpecificOrder } from "@/services/order";

const SpecificOrder = async ({ order }: { order: IOrderResponse }) => {

  const {
    prescription,
    shippingInfo,
    shippingCost,
    totalPrice,
    products,
    paymentStatus,
    _id,
    createdAt,
    orderStatus,
  } = order;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-10">
      <Card className="rounded-2xl p-6">
        <CardHeader>
          <CardTitle className="text-xl">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-base">
          <Info label="Order ID" value={_id} />
          <Info label="Placed On" value={new Date(createdAt).toLocaleDateString()} />
          <Info label="Total Products" value={order.products.reduce((sum, product) => sum + product.quantity, 0)} />
          <Info label="Shipping Address" value={shippingInfo.shippingAddress} />
          <Info label="Shipping City" value={shippingInfo.shippingCity} /> 
          <Info label="Shipping Cost" value={`৳${shippingCost}`} />
          <Info label="Order Status" value={<Badge variant="outline">{orderStatus.toUpperCase()}</Badge>} />
          <Info label="Payment Status" value={<Badge variant="secondary" className={`uppercase text-white ${paymentStatus?"bg-green-600":"bg-red-600"}`}>{paymentStatus?"Done":"Due"}</Badge>} />
          <Info
            label="Total Price"
            value={<span className="font-semibold text-green-600">৳{totalPrice}</span>}
          />
        </CardContent>
      </Card>

      {prescription && (
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Prescription</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Image
              src={prescription}
              alt="Prescription"
              width={400}
              height={300}
              className="rounded-lg shadow border object-contain"
            />
          </CardContent>
        </Card>
      )}

      <Card className="rounded-2xl p-6">
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product:any) => (
            <div
              key={product.productId._id}
              className="border rounded-xl p-4 shadow-sm space-y-2 bg-white"
            >
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 relative">
                  <Image
                    src={product.productId.imageUrl[0] || "/placeholder.png"}
                    alt={product.productId.name}
                    fill
                    className="rounded-md border object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{product.productId.name}</p>
                  <p className="text-sm text-muted-foreground">{product.productId.type}</p>
                  <p className="text-sm ">৳{product.productId.price}</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Manufacturer: {product.productId.manufacturer}</p>
                <p>Expiry: {product.productId.expireDate}</p>
                {"requiredPrescription" in product.productId && (
                  <p>
                    Prescription Required:{" "}
                    <Badge
                      className={cn(
                        "text-xs",
                        product.productId.requiredPrescription
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      )}
                    >
                      {product.productId.prescriptionReviewed ? "Yes" : "N/A"}
                    </Badge>
                  </p>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

const Info = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="text-base font-medium text-slate-800 break-words">{value}</p>
  </div>
);

export default SpecificOrder;
