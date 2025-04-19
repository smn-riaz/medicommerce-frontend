// components/MedicineCard.tsx
'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { TMedicineResponse } from '@/types';
import Link from 'next/link';



export default function MedicineCard({ medicine }: { medicine: TMedicineResponse }) {
  const { name, description, price, discount,quantity, imageUrl, _id} = medicine;

  return (
    <motion.div
    whileHover={{ scale: 1.02 }}
    className="transition-transform h-full"
  >
    <Card className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg flex flex-col h-full">
      <Image
        src={imageUrl[0]}
        alt={name}
        width={400}
        height={250}
        className="object-cover w-full h-48"
      />
      <CardContent className="space-y-3 p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{name}</h3>
         {quantity>0?<Badge className='bg-green-800 text-sm py-0'>{quantity}</Badge>:<Badge className='bg-red-800 text-sm py-0'>Out of stock</Badge>}
        </div>
  
        <p className="text-sm text-muted-foreground line-clamp-2 flex-grow">
          {description}
        </p>
  
        <div className="flex justify-between items-center pt-2">
          <span className="text-primary font-bold text-md flex flex-col sm:flex-row gap-1">
            {discount > 0 && (
              <del className="text-red-400">৳{price.toFixed(2)}</del>
            )}
            <span>৳{(price * (1 - discount / 100)).toFixed(2)}</span>
          </span>
         <Link href={`/medicine/${_id}`}> <Button size="sm" >
             More Details
          </Button></Link>
        </div>
      </CardContent>
    </Card>
  </motion.div>
  
  );
}
