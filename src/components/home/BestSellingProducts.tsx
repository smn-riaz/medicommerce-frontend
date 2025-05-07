import { getAllMedicine } from '@/services/medicine';
import React from 'react';
import BestSellingProductCard from './BestSellingProductCard';
import { TMedicineResponse } from '@/types';

const BestSellingProducts = async () => {
    const {data} =  await getAllMedicine()

    const allowedTypes = ['Skin Care', 'Food', 'Baby', 'Tablet'];
    const medicines = data.filter((med: TMedicineResponse) => allowedTypes.includes(med.type)).slice(0,10)
    
    return (
       <div className='' id='bestselling'>
        <h1 className='text-center text-3xl font-semibold'>Best Selling Products</h1>
         <div className='grid grid-cols-5 gap-6'>
            
            {
            medicines.map((medicine:TMedicineResponse) => <BestSellingProductCard key={medicine._id} medicine={medicine}/>)
            }
        </div>
       </div>
    );
};

export default BestSellingProducts;