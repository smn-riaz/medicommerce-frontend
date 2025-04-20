"use client"
import Footer from '@/components/home/Footer';
import Navbar from '@/components/home/Navbar';
import PreLoading from '@/components/home/PreLoading';
import React, { useEffect, useState } from 'react';

const CartLayout = ({children}:{children:React.ReactNode}) => {
    
        return (
            <main>
                <div>
                <Navbar />
                </div>
                <div className='min-h-screen bg-white'>
                {children}
                </div>
            </main>
        )
    
  
    
};

export default CartLayout;