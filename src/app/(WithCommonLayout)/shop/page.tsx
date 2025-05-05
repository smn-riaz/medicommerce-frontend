export const dynamic = "force-dynamic";


import AllProducts from "@/components/home/AllProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllMedicine } from "@/services/medicine";

import React from "react";

const AllMedicinesPage = async ({searchParams}:{searchParams:Promise<{searchItem:string}>}) => {

  const { data: medicines } = await getAllMedicine(await searchParams)

  
  return (
    <div className="">
      {
        medicines.length ? <AllProducts medicines={medicines} filterOption={true} /> :  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
      }
    </div>
  );
};

export default AllMedicinesPage;
