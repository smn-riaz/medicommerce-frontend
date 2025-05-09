"use client"

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TMedicineResponse } from "@/types";
import {  ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { addItemToCart } from "@/redux/features/cartSlice";
import { toast } from "sonner";

export default function BestSellingProductCard({
  medicine,
}: {
  medicine: TMedicineResponse;
}) {

  const { name, description, type, requiredPrescription, price, discount, expireDate , quantity, imageUrl, _id } =
    medicine;


    const dispatch = useAppDispatch()

    const handleAddToCart = () => {
      dispatch(
            addItemToCart({
              id: _id,
              name,
              quantity: 1,
              price,
              image: medicine.imageUrl[0],
              description,
              type,
              prescription:requiredPrescription,
            }))

            toast.success(`${name} added to cart!`, { duration: 1000 });
    }
  return (
    <Card className="w-full max-w-xs rounded-2xl shadow-lg border p-4 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 min-h-[440px]">
      {/* Image Container */}
      <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={medicine.imageUrl[0]}
          alt={medicine.name}
          fill
          className="object-contain"
        />
        {
          medicine.quantity ? <Badge className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-md shadow-sm">
          In stock: {medicine.quantity}
        </Badge> : <Badge className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md shadow-sm">
          Stock out
        </Badge>
        }
      </div>

      {/* Card Content */}
      <CardContent className="flex flex-col gap-2 flex-grow">
        <h2 className="text-md font-semibold line-clamp-2">{medicine.name}</h2>
        <p className="text-sm dark:text-gray-300 text-gray-500 line-clamp-2">{medicine.description}</p>

        {/* Price Section */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 mt-2">
            <span className="text-base font-semibold text-primary">
              ৳{medicine.price}
            </span>
            {/* Optional discounted price (for demo) */}
           {medicine.discount > 0 &&  <span className="line-through text-sm text-gray-400">৳{(medicine.price * medicine.discount).toFixed(2)}</span>}
          </div>

          {/* Button */}
         <div className="flex justify-between gap-3 items-center pt-4">
         
         
         <Button onClick={handleAddToCart} className="cursor-pointer w-1/2 rounded-xl group">
  <span className="inline-block transform transition-transform duration-500 group-hover:scale-125 group-hover:rotate-[360deg]">
    <ShoppingCart />
  </span>
</Button>
      
        <Button variant="outline" className="w-1/2 cursor-pointer text-sm rounded-xl">
        <Link href={`/medicine/${medicine._id}`}>Details</Link>
          </Button>
         </div>
        </div>
      </CardContent>
    </Card>
  );
}
