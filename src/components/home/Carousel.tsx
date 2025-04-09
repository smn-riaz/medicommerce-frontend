"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TMedicine } from "@/types";
import SectionHeadline from "../shared/home/sectionHeadline";
import Image from "next/image";
import Link from "next/link";

export default function Carousel({ medicines }: { medicines: TMedicine[] }) {
  return (
    <div className="p-8 min-h-screen">
      <SectionHeadline headline="Popular Medicines" />

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
        {medicines.map((med) => (
          <SwiperSlide key={med._id}>
            <Card className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all h-[250px] flex flex-row">
              <div>
              <Image
                src={med.imageUrl[0]}
                alt={med.name}
                width={200}
                height={100}
              />
              </div>
              <CardContent className="p-3">
                <div className="flex flex-col justify-between gap-y-4">
                  <div>
                    <h3 className="text-base font-semibold truncate">
                      {med.name}
                    </h3>
                  </div>
                  <div>
                  <p className="text-xs text-muted-foreground">{med.type}</p>
                  </div>
                  <div>
                    <p>
                      <span>
                        ৳{(med.price * (1 - med.discount / 100)).toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href={`/medicine/${med._id}`}><Button size="sm" className="w-full">
                    See More
                  </Button></Link>
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="custom-pagination flex justify-center mt-4 gap-2"></div>
    </div>
  );
}
