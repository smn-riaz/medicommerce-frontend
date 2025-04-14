import AllProducts from '@/components/home/AllProducts';
import { getAllMedicine } from '@/services/medicine';
import React from 'react';

const AllMedicinesPage = async() => {
    const {data:medicines} = await getAllMedicine()
    return (
        <div className='my-18 pt-10'>
            <AllProducts medicines={medicines}/>
        </div>
    );
};

export default AllMedicinesPage;