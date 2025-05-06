

export const dynamic = "force-dynamic";

import React, { Suspense } from "react";
import AllProducts from "@/components/home/AllProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllMedicine } from "@/services/medicine";
import SectionHeadline from "@/components/shared/home/sectionHeadline";
import FilterMedicine from "@/components/home/FilterMedicine";

// Server Component to fetch data
const fetchMedicines = async (searchParams: { searchItem: string }) => {
  const { data } = await getAllMedicine(searchParams);
  return data;
};

const AllMedicinesPage = async ({ searchParams }: { searchParams: Promise<{ searchItem: string }> }) => {
  const medicines = await fetchMedicines(await searchParams);

  return (
    <div className="">
       <SectionHeadline headline="Everything You Need for Better Care" /> 
       {<FilterMedicine /> }
      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 p-16">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex flex-col space-y-3 ">
                <Skeleton className="h-[125px] w-[250px] rounded-xl bg-[#ebeff1d3]" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px] bg-[#ebeff1d3]" />
                  <Skeleton className="h-4 w-[200px] bg-[#ebeff1d3]" />
                </div>
              </div>
            ))}
          </div>
        }
      >
        {medicines.length ? <AllProducts medicines={medicines} filterOption={true} /> : <p className="text-center text-3xl flex justify-center items-center my-12 text-red-600 ">No products found</p>}
      </Suspense>
    </div>
  );
};

export default AllMedicinesPage;
