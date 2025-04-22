"use client";

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
      <Navbar />
      <div className="min-h-screen bg-white">{children}</div>
      <Footer />
    </main>
  );
};

export default CommonLayout;
