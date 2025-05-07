
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { categories } from "./DynamicCategories";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export function HoverNavbarCategory() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <p
          className={`hover:text-primary gropu transition cursor-pointer flex`}
        >
          Categories <ChevronDown />
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <Link href="/shop" className="text-center group flex">
            All Products
            <span className="">
              <ArrowRight className="absolute right-0 transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-0 text-blue-700 font-semibold transition-all duration-300 ease-in-out" />
            </span>
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {categories.map((category, index) => (
            <Link href={`/shop/${category.name}`}>
              {" "}
              <DropdownMenuItem key={index} className="cursor-pointer bg-background dark:hover:bg-gray-700">
                <Image
                  src={category.image}
                  alt={category.name}
                  className="w-6 h-6 mr-2"
                />
                {category.name}
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
