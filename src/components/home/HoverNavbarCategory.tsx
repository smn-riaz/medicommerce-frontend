import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Import your images for each category
import injection from "@/assets/injection.png";
import syrup from "@/assets/syrup.png";
import drugs from "@/assets/drugs.png";
import nutrition from "@/assets/nutrition.png";
import skincare from "@/assets/skincare.png";
import playtime from "@/assets/playtime.png";
import drop from "@/assets/drop.png";
import medicine from "@/assets/medicine.png";
import { categories } from "./DynamicCategories";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


export function HoverNavbarCategory() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <p className={`hover:text-primary transition cursor-pointer`}>Categories</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel><Link href="/shop" className="text-center group flex">All Products<span className="">
              <ArrowRight
  className="absolute right-0 transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-0 text-blue-700 font-semibold transition-all duration-300 ease-in-out"
/>

              </span></Link></DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {categories.map((category, index) => (
           <Link href={`/shop/${category.name}`}> <DropdownMenuItem key={index} className="cursor-pointer">
           <Image src={category.image} alt={category.name} className="w-6 h-6 mr-2" />
           {category.name}
         </DropdownMenuItem></Link>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
