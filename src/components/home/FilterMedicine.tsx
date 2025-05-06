"use client";


import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TMedicineResponse } from "@/types";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export default function FilterMedicine({

}: {
 
}) {


  const manufacturers = ['ABC Pharma', 'Beximco Pharmaceuticals Ltd', 'ACME Laboratories Ltd', 'Ziska Pharmaceuticals Ltd', 'MediCore Pharma', 'PainRelief Pharma', 'DiabetaMed', 'WellCare Pharma', 'NovaCare Pharma',"Genereal Pharma","Square Pharma","Pfizer"]

  const types = ['Syrup', 'Tablet', 'Capsule', 'Injection', 'Drops', "Skin Care","Food", "Baby"]


  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilter = (query: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(query, value);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className=" p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 w-full">
   
      <div className="w-full md:w-1/3">
        <Input
          placeholder="Search by medicine name..."
         
          onChange={(e) => handleFilter("searchTerm", e.target.value)}
          className="w-full rounded-lg focus-visible:ring-green-500 border-gray-300"
        />
      </div>


      {/* Manufacturer */}
      <div className="w-full md:w-[200px]">
        <Select
       
          onValueChange={(val) => handleFilter("manufacturer", val)}
        >
          <SelectTrigger className="w-full rounded-lg">
            <SelectValue placeholder="Select Manufacturer" />
          </SelectTrigger>
          <SelectContent>
            {manufacturers.map(
              (manufacturer) => (
                <SelectItem key={manufacturer} value={manufacturer}>
                  {manufacturer}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>


      {/* Type */}
      <div className="w-full md:w-[200px]">
        <Select  onValueChange={(val) => handleFilter("type", val)}>
          <SelectTrigger className="w-full rounded-lg">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            {types.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
      <Button
          variant="ghost"
         
          onClick={() =>  router.push(`${pathname}`)}
          className="flex justify-end items-center pl-2 pr-0 text-red-500 font-semibold bg-gray-200 rounded-2xl hover:bg-gray-200 hover:text-red-500 cursor-pointer"
        >
          <span>Reset</span><Button variant="ghost" className="text-red-500 font-semibold bg-gray-300 rounded-full  hover:bg-gray-300 hover:text-red-500 cursor-pointer"  size="icon"><X className="w-4 h-4" /></Button>
        </Button>
      </div>
    </div>
  );
}
