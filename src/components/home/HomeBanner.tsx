
'use client';

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import banner from '../../assets/banner.png'
import Link from 'next/link';


export default function HomeBanner() {
  return (
    <section className="relative lg:min-h-[100vh] bg-gradient-to-r from-blue-100 via-white to-green-100  overflow-hidden p-6 shadow-lg  lg:w-auto">
      <div className="lg:max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-5 md:px-12 items-center justify-center lg:mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center items-center"
        >
          <div className='space-y-6'>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Your Trusted 
          </h1>
          <h1 className="text-4xl md:text-5xl font-bold  text-blue-600">MediCommerce</h1>
          <p className="text-gray-600 text-lg">
            Shop quality medicines, health products & wellness essentials delivered to your door.
          </p>
          <Link href="/shop"><Button className="text-lg px-6 py-2 rounded-xl">
            Shop Now
          </Button></Link>
          </div>
        </motion.div>

       
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center md:justify-end"
        >
          <Image
            src={banner}
            alt="Medicine Banner"
            width={400}
            height={400}
            className="object-contain drop-shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}
