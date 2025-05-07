// components/MedicineCard.tsx
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { TMedicineResponse } from "@/types";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function MedicineCard({
  medicine,
}: {
  medicine: TMedicineResponse;
}) {
  const { name, description, price, discount, quantity, imageUrl, _id } =
    medicine;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="transition-transform h-full"
    >
      <Card className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg flex flex-col h-full">
        <Image
          src={imageUrl[0] || ""}
          alt={name}
          width={400}
          height={250}
          className="object-cover w-full h-48"
        />
        <CardContent className="space-y-3 p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold line-clamp-1">{name}</h3>
            {quantity > 0 ? (
              <Badge className="bg-green-700 dark:bg-green-300 text-sm py-0">{quantity}</Badge>
            ) : (
              <Badge className="bg-red-800 dark:bg-red-400 dark:text-white text-sm py-0">Out of stock</Badge>
            )}
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 overflow-hidden text-ellipsis flex-grow pb-10">
  {description.length > 50 ? `${description.slice(0, 50)}...` : description}
</p>





  

          <div className="flex justify-between items-center pt-2 relative">
  <span className="text-primary font-bold text-md flex flex-col sm:flex-row gap-1">
    {discount > 0 && (
      <del className="text-red-400">৳{price.toFixed(2)}</del>
    )}
    <span>৳{(price * (1 - discount / 100)).toFixed(2)}</span>
  </span>

  <span className="absolute top-[-20px] left-1/2 -translate-x-1/2 cursor-pointer bg-gradient-to-br from-blue-500 to-indigo-600 p-[10px] rounded-full group shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
    <span className="transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6">
      <ShoppingCart color="white" size={18} />
    </span>
  </span>

  <Link href={`/medicine/${_id}`}>
    <Button
      size="sm"
      className="cursor-pointer border-[1px] shadow-2xl shadow-accent-content border-[#918d8d8a] bg-[#488BF7] text-white rounded-lg px-4 py-2 transition-all duration-500 ease-in-out hover:bg-white hover:text-black hover:scale-105"
    >
      Details
    </Button>
  </Link>
</div>




        </CardContent>
      </Card>
    </motion.div>
  );
}
