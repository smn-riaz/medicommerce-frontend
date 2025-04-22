
export const dynamic = "force-dynamic";


import MedicineDetail from '@/components/home/MedicineDetail';
import { useUser } from '@/context/UserContext';
import { getCurrentUser } from '@/services/auth';
import { getSingleMedicine } from '@/services/medicine';
import { getSpecificUserProductReview } from '@/services/review';
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

    const {id} = await getCurrentUser()

    const {data:review} = id 
        ? await getSpecificUserProductReview({userId: id, productId: medicine._id}) 
        : { data: null };
 
    

    return (
        <div className='my-16'>
            <MedicineDetail medicine={medicine} review={review || ""}/>
        </div>
    );
};

export default MedicineDetailPage;