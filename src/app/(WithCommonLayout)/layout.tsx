"use client";

import ChatBox from '@/components/home/Chatbot';
import Footer from '@/components/home/Footer';
import Navbar from '@/components/home/Navbar';
import PreLoading from '@/components/home/PreLoading';
import React, { useEffect, useState } from 'react';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  // const [showPreloader, setShowPreloader] = useState(false);
  // const [mounted, setMounted] = useState(false)

  // useEffect(() => {
  //   setMounted(true)

  //   const hasSeenPreloader = sessionStorage.getItem("hasSeenPreloader");

  //   if (!hasSeenPreloader) {
  //     setShowPreloader(true);

  //     const timer = setTimeout(() => {
  //       setShowPreloader(false);
  //       sessionStorage.setItem("hasSeenPreloader", "true");
  //     }, 3000);

  //     return () => clearTimeout(timer);
  //   }
  // }, []);

  // if (!mounted) return null; 

  // if (showPreloader) {
  //   return <PreLoading />;
  // }


  return (
    <main>
      
      <div className='h-[12vh]  bg-gradient-to-r from-blue-100 via-white to-green-100 '>
      <Navbar />
      </div>

      <div className="md:min-h-[78vh] bg-white relative">
        {children}
        <div className="fixed top-[70vh] right-4 z-50">
          <ChatBox userId="user123" receiverId="admin123" />
        </div>
        </div>
      <Footer />
    </main>
  );
};

export default CommonLayout;
