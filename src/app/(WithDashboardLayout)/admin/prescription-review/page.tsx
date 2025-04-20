export const dynamic = "force-dynamic";


import ManagePrescriptionReview from '@/components/dashboard/admin/prescription/ManagePrescriptionsReview';
import { getAllOrder } from '@/services/order';
import { IOrderResponse } from '@/types';
import React from 'react';

const PrescriptionsReviewPage = async() => {
    const {data} =  await getAllOrder()

    const orders = data.filter((order:IOrderResponse) => order.prescription)

    return (
        <div className='overflow-x-auto w-full'>
        <ManagePrescriptionReview data={orders}/>
      </div>
    );
};

export default PrescriptionsReviewPage;