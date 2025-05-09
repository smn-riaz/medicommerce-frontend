export const dynamic = "force-dynamic";


import ManageMedicine from '@/components/dashboard/medicine/ManageMedicine';
import { getAllMedicine } from '@/services/medicine';
import React from 'react';

const MedicinesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ searchItem: string }>;
})  => {


   const resolvedSearchParams = await searchParams;
   
   
   
     // Merge searchParams with a default 'limit' if not present
     const searchParamsWithLimit = { ...resolvedSearchParams };
   
   
   
   
     const { data: medicines, meta } = await getAllMedicine(searchParamsWithLimit);

  return (
    <div className='overflow-x-auto w-full'>
      <ManageMedicine data={medicines} meta={meta}/>
    </div>
  );
};

export default MedicinesPage;