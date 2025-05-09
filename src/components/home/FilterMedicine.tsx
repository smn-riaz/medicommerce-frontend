"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { format } from "date-fns";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { X } from "lucide-react";

export default function FilterMedicineSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [price, setPrice] = useState<number[]>([0]);
  const [date, setDate] = useState<Date | undefined>();
  const [searchTerm, setSearchTerm] = useState("");

  const manufacturers = [
    "ABC Pharma", "Beximco Pharmaceuticals Ltd", "ACME Laboratories Ltd",
    "Ziska Pharmaceuticals Ltd", "MediCore Pharma", "PainRelief Pharma",
    "DiabetaMed", "WellCare Pharma", "NovaCare Pharma", "Genereal Pharma",
    "Square Pharma", "Pfizer"
  ];

  const types = [
    "Syrup", "Tablet", "Capsule", "Injection", "Drops",
    "Skin Care", "Food", "Baby"
  ];

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    setPrice([0]);
    setDate(undefined);
    setSearchTerm("");
    router.push(`${pathname}`); // This will reset the query params in the URL
  };

  return (
    <aside className="w-full md:w-[280px] p-4 bg-white dark:bg-zinc-900 shadow rounded-lg space-y-6 text-zinc-900 dark:text-zinc-100">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button
          variant="ghost"
          onClick={clearFilters}
          className="text-red-500 hover:text-red-600 dark:hover:text-red-400"
        >
          <X className="w-4 h-4" />
          <span className="ml-1">Reset</span>
        </Button>
      </div>

      {/* Search */}
      <div className="space-y-1">
        <Label htmlFor="search">Search (Name, Description)</Label>
        <Input
          id="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleFilter("searchTerm", e.target.value);
          }}
        />
      </div>

      {/* Type */}
      <div className="space-y-1">
        <Label>Type</Label>
        <Select onValueChange={(val) => handleFilter("type", val)}>
          <SelectTrigger className="w-full">
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

      {/* Manufacturer */}
      <div className="space-y-1">
        <Label>Manufacturer</Label>
        <Select onValueChange={(val) => handleFilter("manufacturer", val)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Manufacturer" />
          </SelectTrigger>
          <SelectContent>
            {manufacturers.map((manufacturer) => (
              <SelectItem key={manufacturer} value={manufacturer}>
                {manufacturer}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h2 className="font-semibold">Price</h2>
        <div className="flex items-center justify-between text-sm mb-2">
          <span>৳0</span>
          <span>৳5000</span>
        </div>
        <p className="text-sm my-2 text-center">
          Selected Price: <span className="font-semibold py-2">৳{price[0]}</span>
        </p>
        <Slider
          max={5000}
          value={price} // Correctly bind the value for slider
          step={1}
          onValueChange={(value) => {
            setPrice(value);
            handleFilter("price", value[0].toString());
          }}
          className="w-full"
        />
      </div>

      {/* Expiry Date */}
      <div className="space-y-1">
        <Label>Expiry Before</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              {date ? format(date, "PPP") : <span className="text-muted-foreground">Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 dark:bg-zinc-900 dark:border-zinc-700">
          <Calendar
  mode="single"
  selected={date ?? undefined}
  onSelect={(selectedDate) => {
    setDate(selectedDate);
    if (selectedDate) {
      const increasedDate = new Date(selectedDate);
      increasedDate.setDate(increasedDate.getDate() + 1);
      handleFilter("expireDate", increasedDate.toISOString().split("T")[0]);
    } else {
      handleFilter("expireDate", "");
    }
  }}
  defaultMonth={new Date()}
  key={date ? date.toISOString() : "no-date"} // Forces the Calendar to re-render if cleared
  initialFocus
/>

          </PopoverContent>
        </Popover>
      </div>

      {/* Stockout */}
      <div className="space-y-1">
        <Label>Stockout</Label>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="stockout"
            onCheckedChange={(checked) =>
              handleFilter("inStock", String(checked !== true))
            }
          />
          <Label htmlFor="stockout" className="text-sm">
            Stockout medicines
          </Label>
        </div>
      </div>
    </aside>
  );
}
