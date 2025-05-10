"use client";

import React, { useState } from "react";
import MedicineCard from "./MedicineCard";
import { IMeta, TMedicineResponse } from "@/types";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { IconRight } from "react-day-picker";
import TablePagination from "../shared/TablePagination";
import LimitDropDown from "./LimitDropDown";

const ShopAllProducts = ({
  medicines,
  meta,
}: {
  medicines: TMedicineResponse[];
  meta: IMeta;
}) => {
  const pathname = usePathname();

  return (
    <div className={``}>
      <div className={`grid grid-cols-1 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 md:gap-4`}>
        {medicines.map((medicine: TMedicineResponse, index) => (
          <MedicineCard key={index} medicine={medicine} />
        ))}
      </div>
    </div>
  );
};

export default ShopAllProducts;
