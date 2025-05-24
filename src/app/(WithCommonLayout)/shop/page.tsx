export const dynamic = "force-dynamic";

import React, { Suspense } from "react";
import HomeAllProducts from "@/components/home/HomeAllProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllMedicine } from "@/services/medicine";
import SectionHeadline from "@/components/shared/home/sectionHeadline";
import FilterMedicine from "@/components/home/FilterMedicine";
import TablePagination from "@/components/shared/TablePagination";
import LimitDropDown from "@/components/home/LimitDropDown";
import ShopAllProducts from "@/components/home/ShopAllProducts";

const AllMedicinesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ searchItem: string }>;
}) => {
 
  const resolvedSearchParams = await searchParams;

  const searchParamsWithLimit = { ...resolvedSearchParams };

  const { data: medicines, meta } = await getAllMedicine(searchParamsWithLimit);




  return (
    <div className="px-4 md:px-8 py-6 bg-background min-h-screen xl:max-w-[1300px] xl:mx-auto">
      <SectionHeadline headline="Everything You Need for Better Care" />
      <div className="flex flex-col md:flex-row gap-8 mt-2">
        {/* Left Sidebar Filter */}
        <div className="md:w-[280px] w-full md:sticky md:top-24 self-start">
          <FilterMedicine />
        </div>

        {/* Product Grid or Fallback */}
        <div className="flex-1">
          <div className="flex justify-between items-center">
                  <TablePagination totalPage={meta?.totalPage}/>
                  {/* <LimitDropDown /> */}
                  
                </div>
          <Suspense
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-full rounded-xl bg-[#ebeff1d3]" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full bg-[#ebeff1d3]" />
                      <Skeleton className="h-4 w-3/4 bg-[#ebeff1d3]" />
                    </div>
                  </div>
                ))}
              </div>
            }
          >
            {medicines?.length ? (
              <ShopAllProducts medicines={medicines} meta={meta} />
            ) : (
              <p className="text-center text-3xl text-red-600 my-12">
                No products found
              </p>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AllMedicinesPage;
