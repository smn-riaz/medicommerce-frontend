"use client"
import Footer from '@/components/home/Footer';
import Navbar from '@/components/home/Navbar';
import PreLoading from '@/components/home/PreLoading';
import React, { useEffect, useState } from 'react';

const CartLayout = ({children}:{children:React.ReactNode}) => {
    const [showPreloader, setShowPreloader] = useState(true)
    
    if (showPreloader) {
        return (
            <main>
                <div>
                <Navbar />
                </div>
                <div className='min-h-screen'>
                {children}
                </div>
            </main>
        )
    }
  
    
};

export default CartLayout;