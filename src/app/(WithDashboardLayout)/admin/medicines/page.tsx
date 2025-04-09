import ManageMedicine from '@/components/dashboard/medicine/ManageMedicine';
import { getAllMedicine } from '@/services/medicine';
import React from 'react';

const MedicinesPage = async() => {
   const {data} =  await getAllMedicine()
  return (
    <div className='overflow-x-auto w-full'>
      <ManageMedicine data={data}/>
    </div>
  );
};

export default MedicinesPage;