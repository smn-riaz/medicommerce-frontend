import UserManageOrders from '@/components/dashboard/user/orders/UserManageOrders';
import { getAllOrder } from '@/services/order';
import React from 'react';

const OrdersPage = async() => {

     const {data} =  await getAllOrder()
    return (
        <div>
            <UserManageOrders data={data} />
        </div>
    );
};

export default OrdersPage;