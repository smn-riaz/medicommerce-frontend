"use client"
import Footer from '@/components/home/Footer';
import Navbar from '@/components/home/Navbar';
import PreLoading from '@/components/home/PreLoading';
import React, { useEffect, useState } from 'react';

const CommonLayout = ({children}:{children:React.ReactNode}) => {
    const [showPreloader, setShowPreloader] = useState(true)

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //       setShowPreloader(false)
    //     }, 3000) 
    
    //     return () => clearTimeout(timer)
    //   }, [])
    
    if (showPreloader) {
        return (
            <main>
                <div>
                <Navbar />
                </div>
                <div className='min-h-screen'>
                {children}
                </div>
                <Footer />
            </main>
        )
    }
    else {
        return <PreLoading />
    }
    
};

export default CommonLayout;