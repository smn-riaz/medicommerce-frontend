"use server"

import AllProducts from '@/components/home/AllProducts';
import Carousel from '@/components/home/Carousel';
import HomeBanner from '@/components/home/HomeBanner';
import Testimonials from '@/components/home/Testimonials';
import { reviews } from '@/constants/reviews';
import { getAllMedicine } from '@/services/medicine';
import React from 'react';

const HomePage = async() => {
  const {data:medicines} = await getAllMedicine()
  return (
    <main className='my-16'>
      <HomeBanner />
      <Carousel medicines={medicines.slice(0,4)}/>
      <AllProducts medicines={medicines.slice(1,7)}/>
      <Testimonials reviews={reviews}/>
    </main>
  );
};

export default HomePage;