import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MedicineSearchbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("searchTerm", value);
    } else {
      params.delete("searchTerm");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-1 mb-6">
      <Label htmlFor="search">Search (Name, Description)</Label>
      <Input
        id="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default MedicineSearchbar;
