export const dynamic = "force-dynamic";


import AllProducts from "@/components/home/AllProducts";
import { getAllMedicine } from "@/services/medicine";

import React from "react";

const AllMedicinesPage = async ({searchParams}:{searchParams:Promise<{searchItem:string}>}) => {

  const { data: medicines } = await getAllMedicine(await searchParams)

  
  return (
    <div className="my-18 pt-10">
      <AllProducts medicines={medicines} filterOption={true} />
    </div>
  );
};

export default AllMedicinesPage;
