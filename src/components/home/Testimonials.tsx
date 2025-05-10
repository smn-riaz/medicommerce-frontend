"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TReviewResponse } from "@/types";
import Link from "next/link";

const Testimonials = ({ reviews }: { reviews: TReviewResponse[] }) => {
  return (
    <section className="  dark:bg-gray-800 p-2 rounded-md xl:max-w-[1300px] xl:mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews
  ?.filter(review => review.userId?.name).slice(0,8)
  .map((review, index) => (
    <motion.div
      key={index}
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow hover:shadow-lg transition-transform h-full flex flex-col"
    >
      <div className="flex items-center gap-4 mb-4">
        <Image
          width={50}
          height={50}
          src="https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg"
          alt={review.userId?.name || "User"}
          className="rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">
            {review.userId?.name?.toUpperCase() || "User"}
          </h4>
        </div>
      </div>

      <p className="py-2 text-primary text-center font-semibold">
        <Link href={`/medicine/${review.productId._id}`}>
          {review.productId?.name || "Product"}
        </Link>
      </p>
      <hr className="py-1 border-gray-300 dark:border-gray-600" />
      <p className="text-md text-center text-gray-700 dark:text-gray-300">
        {review.title || "Review"}
      </p>
      <hr className="py-1 border-gray-300 dark:border-gray-600" />
      <p className="text-gray-700 text-sm flex-grow line-clamp-5 dark:text-gray-300">
        "{review.description}"
      </p>

      <div className="flex justify-between items-center">
        <div className="mt-4 text-yellow-400 text-lg">
          {"★".repeat(review.rating)}
          {"☆".repeat(5 - review.rating)}
        </div>

        <p className="text-gray-700 dark:text-gray-400">
          {new Date(review.createdAt).toLocaleDateString()}
        </p>
      </div>
    </motion.div>
))}

      </div>
    </section>
  );
};

export default Testimonials;
