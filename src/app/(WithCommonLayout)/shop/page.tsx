import AllProducts from "@/components/home/AllProducts";
import { getAllMedicine } from "@/services/medicine";
import { useSearchParams } from "next/navigation";
import React from "react";

const AllMedicinesPage = async () => {
  const { data: medicines } = await getAllMedicine()

  const searchParams = useSearchParams();
  const searchItem = searchParams.get("searchItem") || "";
  const manufacturer = searchParams.get("manufacturer") || "";
  const type = searchParams.get("type") || "";

  
  return (
    <div className="my-18 pt-10">
      <AllProducts medicines={medicines} />
    </div>
  );
};

export default AllMedicinesPage;
