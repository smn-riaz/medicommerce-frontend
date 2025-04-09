import AllProducts from '@/components/home/AllProducts';
import { getAllMedicine } from '@/services/medicine';
import React from 'react';

const AllMedicinesPage = async() => {
    const {data:medicines} = await getAllMedicine()
    return (
        <div>
            <AllProducts medicines={medicines}/>
        </div>
    );
};

export default AllMedicinesPage;