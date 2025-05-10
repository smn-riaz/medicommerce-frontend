"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Imported images
import stemcell from "../../assets/stemcell.jpg";
import alzherimer from "../../assets/alzheimers.jpg";
import mrnavaccine from "../../assets/mrnavaccine.png";
import crispr from "../../assets/crispr.jpg";
import aiheart from "../../assets/aiheart.jpg";
import aidiag from "../../assets/aidiag.png";

type Blog = {
  title: string;
  category: string;
  date: string;
  image: string | StaticImageData;
  description: string;
  url: string;
};

const blogs: Blog[] = [
  {
    title: "Breakthrough in Alzheimer’s Treatment",
    category: "Medical Discovery",
    date: "April 20, 2025",
    image: alzherimer,
    description: "READ MORE",
    url: "https://www.alzheimers.org.uk/about-dementia/treatments/researching-new-drugs-alzheimers-disease",
  },
  {
    title: "New mRNA Vaccine Platform for Cancer",
    category: "Medical Discovery",
    date: "March 15, 2025",
    image: mrnavaccine,
    description: "READ MORE",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10611059",
  },
  {
    title: "CRISPR Used to Cure Genetic Blindness",
    category: "Medical Discovery",
    date: "February 5, 2025",
    image: crispr,
    description: "READ MORE",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9569777/",
  },
  {
    title: "A.I Detects Heart Disease",
    category: "Medical Discovery",
    date: "January 25, 2025",
    image: aiheart,
    description: "READ MORE",
    url: "https://newsroom.heart.org/news/ai-may-accurately-detect-heart-valve-disease-and-predict-cardiovascular-risk",
  },
  {
    title: "Stem Cell Therapy Restores Movement",
    category: "Medical Discovery",
    date: "December 10, 2024",
    image: stemcell,
    description: "READ MORE",
    url: "https://aimis.com/blog/paralysis-stem-cell-treatment-therapy",
  },
  {
    title: "AI-Powered Diagnostics Healthcare",
    category: "Medical Technology",
    date: "March 15, 2025",
    image: aidiag,
    description: "READ MORE",
    url: "https://bmcmededuc.biomedcentral.com/articles/10.1186/s12909-023-04698-z",
  }
];

export default function Blogs() {
  return (
    <section className="p-2 bg-background xl:max-w-[1300px] xl:mx-auto ">
  
    <Carousel opts={{ align: "start" }} className="w-full">
      <CarouselContent className="-ml-4 md:-ml-6">
        {blogs.map((blog, index) => (
          <CarouselItem
            key={index}
            className="pl-2 md:pl-6 basis-[85%] sm:basis-[50%] lg:basis-[33.333%] xl:basis-[25%]"
          >
            <Card className="relative rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-background dark:bg-gray-700">
              {/* Fixed height for image container */}
              <div className="w-full h-52 overflow-hidden rounded-t-xl">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={400}
                  height={208}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Fixed height for Card content section */}
              <CardContent className="p-5 h-44">
                <p className="text-xs text-center uppercase p-1 bg-[#f7f2f2] dark:bg-gray-600 font-semibold text-primary dark:text-gray-300 mb-1">
                  {blog.category}
                </p>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300 mb-3">
                  📅 {blog.date}
                </p>
                <Link
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-medium text-primary hover:underline dark:text-blue-400"
                >
                  {blog.description}
                </Link>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
  
      <CarouselPrevious className="-left-6 text-gray-700 dark:text-gray-300" />
      <CarouselNext className="-right-6 text-gray-700 dark:text-gray-300" />
    </Carousel>
  </section>
  
  
  
  );
}
 