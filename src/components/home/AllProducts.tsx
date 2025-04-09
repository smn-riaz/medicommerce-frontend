"use client"

import React from "react";
import MedicineCard from "./MedicineCard";
import { TMedicine } from "@/types";
import SectionHeadline from "../shared/home/sectionHeadline";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { IconRight } from "react-day-picker";

const AllProducts =  ({ medicines }: { medicines: TMedicine[] }) => {
const pathname = usePathname()

  return (
    <section>
      <SectionHeadline headline="Everything You Need for Better Care" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 m-6">
        {medicines.map((medicine: TMedicine, index) => (
          <MedicineCard key={index} medicine={medicine} />
        ))}
      </div>

        {
          pathname === "/" && <div className="flex justify-center items-center my-6">
          <Link href="/shop"><Button className="bg-accent">See More <IconRight /></Button></Link>
        </div>
        }

    </section>
  );
};

export default AllProducts;
