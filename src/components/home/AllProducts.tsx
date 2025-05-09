"use client"

import React from "react";
import MedicineCard from "./MedicineCard";
import { TMedicineResponse } from "@/types";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { IconRight } from "react-day-picker";


const AllProducts =  ({ medicines, filterOption }: { medicines: TMedicineResponse[], filterOption:boolean }) => {

const pathname = usePathname()

  return (
    <div className=" lg:min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-2">
        {medicines.map((medicine: TMedicineResponse, index) => (
          <MedicineCard key={index} medicine={medicine} />
        ))}
      </div>

        {
          pathname === "/" && <div className="flex justify-center items-center my-6">
          <Link href="/shop"><Button className="bg-primary cursor-pointer">See More <IconRight /></Button></Link>
        </div>
        }

   </div>
  );
};

export default AllProducts;
