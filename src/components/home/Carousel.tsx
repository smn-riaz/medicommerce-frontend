"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TMedicineResponse } from "@/types";
import Image from "next/image";
import Link from "next/link";
import {motion} from 'framer-motion'

export default function Carousel({
  medicines,
}: {
  medicines: TMedicineResponse[];
}) {
  return (
    <motion.div 
    initial={{ opacity: 0.3, y:10}}
    transition={{delay:0.2}}
  whileInView={{ opacity: 1, y:0 }}
     className="xl:max-w-[1300px] xl:mx-auto">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={60}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        pagination={{ el: ".custom-pagination", clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
      >
        {medicines?.map((med) => (
       <SwiperSlide key={med._id}>
  <Card className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all h-[220px] flex flex-col justify-between">
    <div className="flex flex-row p-3 gap-2">
      <div className="relative w-[120px] h-[120px] flex-shrink-0">
        <Image
          src={med.imageUrl[0]}
          alt={med.name}
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h3 className="text-base font-semibold">{med.name}</h3>
          <p className="text-xs text-muted-foreground">{med.type}</p>
        </div>
        <div>
          <p>
            <span>
              ৳{(med.price * (1 - med.discount / 100)).toFixed(2)}
            </span>
          </p>
          <p className="text-sm text-gray-400 font-semibold">
            Stock: {med.quantity}
          </p>
        </div>
      </div>
    </div>

    <CardContent className="px-3 pb-4 mt-auto">
      <Link href={`/medicine/${med._id}`}>
        <Button
          size="sm"
          className="w-full cursor-pointer bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg py-2 px-4 
              transition-transform transform hover:scale-105 
              hover:bg-gradient-to-br hover:from-indigo-600 hover:to-blue-500
              focus:outline-none focus:ring-4 focus:ring-indigo-300 hover:shadow-xl"
        >
          See More
        </Button>
      </Link>
    </CardContent>
  </Card>
</SwiperSlide>

        ))}
      </Swiper>

      <div className="custom-pagination flex justify-center mt-4 gap-2"></div>
    </motion.div>
  );
}
