"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";

export default function FilterMedicine() {

    const router = useRouter()
    const pathname = usePathname()
  const [search, setSearch] = useState("");
  const [manufacturer, setManufacturer] = useState<string | undefined>("");
  const [type, setType] = useState<string | undefined>("")

  useEffect(() => {
    const handleSearch = () => {
       router.push(`${pathname}?searchItem=${search}&manufacturer=${manufacturer}&type=${type}`)
    }

    handleSearch()
  },[search, manufacturer, type])

  return (
    <div className=" p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 w-full">
      
      {/* Search Field */}
      <div className="w-full md:w-1/3">
        <Input
          placeholder="Search by medicine name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg focus-visible:ring-green-500 border-gray-300"
        />
      </div>

      {/* Manufacturer */}
      <div className="w-full md:w-[200px]">
        <Select value={manufacturer} onValueChange={(val) => setManufacturer(val || undefined)}>
          <SelectTrigger className="w-full rounded-lg">
            <SelectValue placeholder="Select Manufacturer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beximco">Beximco</SelectItem>
            <SelectItem value="square">Square</SelectItem>
            <SelectItem value="aCME">ACME</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Type */}
      <div className="w-full md:w-[200px]">
        <Select value={type} onValueChange={(val) => setType(val || undefined)}>
          <SelectTrigger className="w-full rounded-lg">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Tablet">Tablet</SelectItem>
            <SelectItem value="Capsule">Capsule</SelectItem>
            <SelectItem value="Syrup">Syrup</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
