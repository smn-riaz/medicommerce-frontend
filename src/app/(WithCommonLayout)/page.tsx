// export const dynamic = "force-dynamic";


import AllProducts from '@/components/home/AllProducts';
import Carousel from '@/components/home/Carousel';
import HomeBanner from '@/components/home/HomeBanner';
import Testimonials from '@/components/home/Testimonials';

import { getAllMedicine } from '@/services/medicine';
import { getAllReviews } from '@/services/review';
import React from 'react';

const HomePage = async() => {
  const {data:medicines} = await getAllMedicine()

  const {data:reviews} = await getAllReviews()
  return (
    <main className='my-16'>
      <HomeBanner />
      <Carousel medicines={medicines.slice(0,4) || []}/>
      <AllProducts medicines={medicines.slice(1,7)} filterOption={false}/>
      <Testimonials reviews={reviews.slice(0,7)}/>
    </main>
  );
};

export default HomePage;