export const dynamic = "force-dynamic";

import Cart from '@/components/cart/cart';
import { getAllMedicine } from '@/services/medicine';
import React from 'react';

const CartPage =async () => {

    const {data} = await getAllMedicine()
    return (
        <div className='my-18 py-10 bg-white'>
            <Cart medicines = {data}/>
        </div>
    );
};

export default CartPage;