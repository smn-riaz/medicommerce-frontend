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

import { categories } from "./DynamicCategories";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

// https://i.ibb.co.com/jsFdJL6/riaz.webp

export function ProfileDropDown({
  user,
  handleLogOut,
}: {
  user: { name: string; role: string };
  handleLogOut: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="border-[1px] border-white cursor-pointer w-12 h-12 p-[3px]">
          <AvatarImage
            src="https://imageio.forbes.com/specials-images/imageserve/62d700cd6094d2c180f269b9/0x0.jpg?format=jpg&crop=959,959,x0,y0,safe&height=416&width=416&fit=bounds"
            alt={user.name}
          />
          <AvatarFallback>
            {user.name && (
              <div className="hidden md:flex items-center">
                <Badge>{user.name.toUpperCase()}</Badge>
              </div>
            )}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <p  className="text-center group flex">
            {user.name.toUpperCase()}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>

         {
          user.role === 'user' ? <>
 <DropdownMenuItem className="cursor-pointer group">
            Profile{" "}
            <span className="">
              <ArrowRight className="absolute right-0 transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-0 text-blue-700 font-semibold transition-all duration-300 ease-in-out" />
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer group flex items-center">
            Orders{" "}
            <span className="">
              <ArrowRight className="absolute right-0 transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-0 text-blue-700 font-semibold transition-all duration-300 ease-in-out" />
            </span>
          </DropdownMenuItem>
          </> 
          
          : 
          
          <>
          <DropdownMenuItem className="cursor-pointer group">
           <Link href="/admin/dashboard"> Dashboard{" "}
            <span className="">
              <ArrowRight className="absolute right-0 transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-0 text-blue-700 font-semibold transition-all duration-300 ease-in-out" />
            </span></Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer group flex items-center">
           <Link href="/admin/products"> Products{" "}
            <span className="">
              <ArrowRight className="absolute right-0 transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-0 text-blue-700 font-semibold transition-all duration-300 ease-in-out" />
            </span></Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer group flex items-center">
          <Link href="/admin/orders">  Orders{" "}
            <span className="">
              <ArrowRight className="absolute right-0 transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-0 text-blue-700 font-semibold transition-all duration-300 ease-in-out" />
            </span></Link>
          </DropdownMenuItem>


          <DropdownMenuItem className="cursor-pointer group flex items-center">
            <Link href="/admin/users">
            Users{" "}
            <span className="">
              <ArrowRight className="absolute right-0 transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-0 text-blue-700 font-semibold transition-all duration-300 ease-in-out" />
            </span></Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer group flex justify-between items-center">
           <Link href="/admin/prescription-review">
           Prescription{" "}
            <span >
              <ArrowRight className="absolute right-0 transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-0 text-blue-700 font-semibold transition-all duration-300 ease-in-out" />
            </span></Link>
          </DropdownMenuItem>
          </>
         }

          <DropdownMenuItem className="cursor-pointer">
            <Button
              onClick={handleLogOut}
              className="bg-amber-600 hover:bg-amber-600 cursor-pointer"
            >
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
