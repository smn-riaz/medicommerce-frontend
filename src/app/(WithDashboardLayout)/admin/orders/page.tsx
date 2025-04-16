import ManageOrders from '@/components/dashboard/admin/orders/ManageOrders';
import { getAllOrder } from '@/services/order';
import React from 'react';

const OrdersPage = async () => {
    const {data} =  await getAllOrder()

    return (
        <div className='overflow-x-auto w-full'>
        <ManageOrders data={data}/>
      </div>
    );
};

export default OrdersPage;