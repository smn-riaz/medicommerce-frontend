"use client";

import React, { useState } from "react";
import MedicineCard from "./MedicineCard";
import { IMeta, TMedicineResponse } from "@/types";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { IconRight } from "react-day-picker";
import {motion} from 'framer-motion'

const HomeAllProducts = ({
  medicines,
  meta,
}: {
  medicines: TMedicineResponse[];
  meta: IMeta;
}) => {
  const pathname = usePathname();

  return (
    <div className={`xl:max-w-[1300px] xl:mx-auto`}>
      <motion.div
      initial={{opacity:0.3}}
      transition={{delay:0.2}}
      whileInView={{opacity:1}}
       className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-2 md:gap-6 lg:gap-10 `}>
        {medicines.slice(0,8).map((medicine: TMedicineResponse, index) => (
          <MedicineCard key={index} medicine={medicine} />
        ))}
      </motion.div>

      {pathname === "/" && (
        <div className="flex justify-center items-center my-6">
          <Link href="/shop">
            <Button className="bg-primary cursor-pointer py-2 w-[200px]">
              See More <IconRight />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomeAllProducts;
