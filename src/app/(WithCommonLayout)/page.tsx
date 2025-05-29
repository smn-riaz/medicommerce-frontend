// export const dynamic = "force-dynamic";

import HomeAllProducts from "@/components/home/HomeAllProducts";
import BestSellingProducts from "@/components/home/BestSellingProducts";
import Blogs from "@/components/home/Blogs";
import Carousel from "@/components/home/Carousel";

import DynamicCategories from "@/components/home/DynamicCategories";
import HomeBanner from "@/components/home/HomeBanner";
import NewsLetter from "@/components/home/NewsLetter";

import Pharmaceuticals from "@/components/home/Pharmaceuticals";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import SectionHeadline from "@/components/shared/home/sectionHeadline";

import {  getHomePageMedicines } from "@/services/medicine";
import { getAllReviews } from "@/services/review";

import React from "react";


const HomePage = async () => {
  const { data: medicines, meta } = await getHomePageMedicines();

  const { data: reviews } = await getAllReviews();

  const carouselMedicineSlice = medicines?.slice(0, 4) || [];

  return (
    <main>
      <div>
        <HomeBanner />
      </div>

      <div className="lg:min-h-[60vh] pt-8 md:pt-10 lg:pt-14 px-6 md:px-10">
        <SectionHeadline headline="Popular Collections" />
        <Carousel medicines={carouselMedicineSlice} />
      </div>

      <div className="pt-8 md:pt-10 lg:pt-14 px-6 md:px-10 ">
        <SectionHeadline headline="Discover Our Products" />
        <HomeAllProducts medicines={medicines || []} meta={meta} />
      </div>

      <div className="pt-8 md:pt-10 lg:pt-14 px-6 md:px-10">
        <WhyChooseUs />
      </div>

      <div className="pt-8 md:pt-10 lg:pt-14 px-6 md:px-10">
        <SectionHeadline headline="Best Selling Products" />
        <BestSellingProducts />
      </div>

      <div className="pt-8 md:pt-10 lg:pt-14 px-6 md:px-10">
        <SectionHeadline headline="Our Products Categories" />
        <DynamicCategories />
      </div>

      <div className="pt-8 md:pt-10 lg:pt-14 px-6 md:px-10">
        <SectionHeadline headline=" What Our Customers Say" />
        <Testimonials reviews={reviews} />
      </div>

      <div className="pt-8 md:pt-10 lg:pt-14 px-6 md:px-10">
        <SectionHeadline headline="Latest Medical Discoveries" />
        <Blogs />
      </div>
      <div className="pt-8 md:pt-10 lg:pt-14 px-6 md:px-10">
        <NewsLetter />
      </div>
     <div className="pt-8 md:pt-10 lg:pt-14 px-6 md:px-10">
        <Pharmaceuticals />
      </div>
    </main>
  );
};

export default HomePage;
