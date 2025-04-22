"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {  TReviewResponse } from "@/types"

const Testimonials = ({ reviews }: { reviews: TReviewResponse[] }) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews?.map((review, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-transform h-full flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <Image
                  width={50}
                  height={50}
                  src={ "https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg"}
                  alt={review.userId?.name as string}
                  className="rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">
                    { review.userId?.name.toLocaleUpperCase()}
                  </h4>
                </div>
              </div>

              <p className="text-md text-center text-gray-700">
                    {review.title || "Review"}
                  </p>
                  <hr className=" py-1 "/>
              <p className="text-gray-700 text-sm flex-grow line-clamp-5">
                "{review.description}"
              </p>

             <div className="flex justify-between items-center">
             <div className="mt-4 text-yellow-400 text-lg">
                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
              </div>

              <p>{new Date(review.createdAt).toLocaleDateString()}</p>

             </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
