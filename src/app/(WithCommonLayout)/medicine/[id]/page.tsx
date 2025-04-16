import MedicineDetail from '@/components/home/MedicineDetail';
import { getSingleMedicine } from '@/services/medicine';
import React from 'react';


export const generateMetadata = async({params}:{params:Promise<{id:string}>}) => {
  
    const medicineId = (await params).id
    const {data:medicine} = await getSingleMedicine(medicineId)
  
    if (!medicine) return { title: 'Medicine Not Found' };
  
    return {
      title: medicine.name,
      description: medicine.description,
      openGraph: {
        title: medicine.name,
        description: medicine.description,
        images: medicine.imageUrl[0],
      },
    };
  }


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