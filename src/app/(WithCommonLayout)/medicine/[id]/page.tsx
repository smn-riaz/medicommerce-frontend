import MedicineDetail from '@/components/home/MedicineDetail';
import { getSingleMedicine } from '@/services/medicine';
import React from 'react';

const MedicineDetailPage = async({params}:{params:Promise<{id:string}>}) => {
    const medicineId = (await params).id
    const {data:medicine} = await getSingleMedicine(medicineId)
    return (
        <div className='my-16'>
            <MedicineDetail medicine={medicine}/>
        </div>
    );
};

export default MedicineDetailPage;