// export const dynamic = "force-dynamic";


import AllProducts from '@/components/home/AllProducts';
import BestSellingProducts from '@/components/home/BestSellingProducts';
import Blogs from '@/components/home/Blogs';
import Carousel from '@/components/home/Carousel';
import ChatBox from '@/components/home/Chatbot';
import DynamicCategories from '@/components/home/DynamicCategories';
import HomeBanner from '@/components/home/HomeBanner';
import NewsLetter from '@/components/home/NewsLetter';
import OfferedProducts from '@/components/home/OfferedProducts';
import Pharmaceuticals from '@/components/home/Pharmaceuticals';
import Testimonials from '@/components/home/Testimonials';
import WhyChooseUs from '@/components/home/WhyChooseUs';

import { getAllMedicine } from '@/services/medicine';
import { getAllReviews } from '@/services/review';
import React from 'react';

const HomePage = async() => {
  const {data:medicines} = await getAllMedicine()

  const {data:reviews} = await getAllReviews()
  return (
    <main className=''>
      <HomeBanner />
      <Carousel medicines={medicines.slice(0,4) || []}/>
      <AllProducts medicines={medicines.slice(1,7)} filterOption={false}/>
      <WhyChooseUs />
      <BestSellingProducts />
      <DynamicCategories />
      <Testimonials reviews={reviews.slice(0,6)}/>
      <Blogs />
      <NewsLetter />
      <Pharmaceuticals />
    </main>
  );
};

export default HomePage;