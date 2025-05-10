import HomeAllProducts from "@/components/home/HomeAllProducts";
import { categories } from "@/components/home/DynamicCategories";
import SectionHeadline from "@/components/shared/home/sectionHeadline";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllMedicine } from "@/services/medicine";
import { AlignRight, MoveRightIcon, PanelRightDashed, SquareChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

const CategoryProductsPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;

  const { data: medicines , meta} = await getAllMedicine({ type: category });

  return (
    <div className="px-6">
      <SectionHeadline headline="Everything You Need for Better Care" /> 
      <p className="flex space-x-4 px-4"><Link href={"/"}>Home</Link><SquareChevronRight/><Link href={"/shop"}>Shop</Link> <SquareChevronRight/> <span className="text-blue-500 font-semibold">{category}</span></p>

      <div className="flex justify-between w-full">
        <div className=" w-[120%]">
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
            {medicines.length ? (
              <HomeAllProducts medicines={medicines} meta={meta}/>
            ) : (
              <p className="text-center text-3xl flex justify-center items-center my-12 text-red-600 ">
                No products found
              </p>
            )}
          </Suspense>
        </div>

        <div className="sticky top-24 h-fit">
            {
                categories.map(cat => <Link href={`/shop/${cat.name}`} className="relative group">
                    <div className={` ${cat.name === category ? "bg-[#609fe7]":"bg-[#b9d8e042]"} p-3 rounded-full m-4 cursor-pointer`}>
                      <Image alt={cat.name} src={cat.image} height={60} width={60} />
                    </div>
                  
                    <p className={`absolute ${cat.name === category ?"opacity-100" :"opacity-0"}  group-hover:opacity-100 top-0 right-10 -translate-x-1/8 bg-[#d7e9e9] p-1 rounded-lg text-center text-sm whitespace-nowrap`}>
                      {cat.name}
                    </p>
                  </Link>
                  )
            }
        </div>
      </div>
    </div>
  );
};

export default CategoryProductsPage;
