"use client"

import { TReview } from '@/types';
import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = ({reviews}:{reviews:TReview[]}) => {
    return (
        <section className="py-12 bg-gray-50">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews?.map((review, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-transform h-full flex flex-col"
        >
          <div className="flex items-center gap-4 mb-4">
            <img
              src={review.image}
              alt={review.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h4 className="font-semibold">{review.name}</h4>
              <p className="text-sm text-gray-500">{review.occupation}</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm flex-grow line-clamp-5">"{review.review}"</p>
          <div className="mt-4 text-yellow-400 text-lg">
            {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

    );
};

export default Testimonials;