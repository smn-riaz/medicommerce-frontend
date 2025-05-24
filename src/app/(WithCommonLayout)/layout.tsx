"use client";

import AiSuggestion from "@/components/home/AiSuggestion";
import Chatbot from "@/components/home/Chatbot";

import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import PreLoading from "@/components/home/PreLoading";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  return (
    <main className="min-h-screen">
      <div className={`h-[12vh]  flex justify-center  ${pathname==='/'?'bg-gradient-to-r dark:bg-background from-blue-100 via-white to-green-100 dark:from-background dark:via-background dark:to-background':'bg-background'}`}>
        <Navbar />
      </div>

      <div className=" relative">
        {children}
        <div className="fixed top-[85vh] sm:top-[75vh] z-50">
          <Chatbot />
        </div>
      </div>
      <div className="xl:max-w-[1300px] xl:mx-auto">
        <Footer />
      </div>
    </main>
  );
};

export default CommonLayout;
