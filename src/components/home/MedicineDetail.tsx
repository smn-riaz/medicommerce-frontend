"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addItemToCart,
  specificProductQuantitySelector,
} from "@/redux/features/cartSlice";
import { useUser } from "@/context/UserContext";

import { TMedicineResponse, TReview, TReviewResponse } from "@/types";
import { createReview } from "@/services/review";
import MedicineCard from "./MedicineCard";

export default function MedicineDetail({
  medicine,
  reviews,
  relatedMedicines,
}: {
  medicine: TMedicineResponse;
  reviews: TReviewResponse[];
  relatedMedicines: TMedicineResponse[];
}) {
  const router = useRouter();
  const { user } = useUser();
  const dispatch = useAppDispatch();

const userHasReview =  reviews?.some(
  (review) => review.userId && review.userId._id === user?.id
);

  const [selectedImage, setSelectedImage] = useState(medicine.imageUrl[0]);
  const { cartedProductQuantity } = useAppSelector((state) =>
    specificProductQuantitySelector(state, { id: medicine._id })
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  const handleStarClick = (value: number) => setRating(value);

  const handleSubmit = async () => {
    try {
      if (!user?.id) return toast.error("Please login first!");
      if (userHasReview) return toast.error("You have already reviewed this product.");
      if (title.length < 3 || title.length > 100)
        return toast.error("Title must be between 3 and 100 characters.");
      if (description.length < 10 || description.length > 1000)
        return toast.error("Description must be between 10 and 1000 characters.");
      if (rating === 0) return toast.error("Please give a rating.");

      const reviewData: TReview = {
        userId: user.id,
        productId: medicine._id,
        title,
        description,
        rating,
      };

      const res = await createReview(reviewData);
      if (res?.success) {
        toast.success(res.message);
        setTitle("");
        setDescription("");
        setRating(0);
      } else {
        toast.error(res.message || "Failed to submit review.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        id: medicine._id,
        name: medicine.name,
        quantity: 1,
        price: medicine.price,
        image: medicine.imageUrl[0],
        description: medicine.description,
        type: medicine.type,
        prescription: medicine.requiredPrescription,
      })
    );
    toast.success("Medicine added to cart!", { duration: 1000 });
    router.push("/cart");
  };

  return (
    <div className="">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Images */}
          <div>
            <AnimatePresence mode="wait">
            <motion.div 
            key={selectedImage}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
           
            >
              <Image
              width={400}
              height={300}
              src={selectedImage}
              alt={medicine.name}
              className="max-w-xs w-60 lg:w-150 h-64 object-cover rounded-lg shadow-lg"
            />
            </motion.div>
            </AnimatePresence>
            <div className="mt-4 flex space-x-4">
              {medicine.imageUrl.map((image, index) => (
                <Image
                  key={index}
                  width={70}
                  height={70}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform ${
                    selectedImage === image ? "border-2 border-primary" : ""
                  }`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div>
            <Card className="rounded-xl shadow-md p-6">
              <CardHeader>
                <CardTitle className="text-3xl font-semibold">
                  {medicine.name}
                </CardTitle>
                <CardDescription>{medicine.type}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg text-muted-foreground">
                  {medicine.description}
                </p>

                <div className="text-sm">
                  <strong>Manufacturer:</strong> {medicine.manufacturer}
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xl font-semibold text-primary">
                    ৳
                    {(medicine.price * (1 - medicine.discount / 100)).toFixed(
                      2
                    )}
                  </span>
                  {medicine.discount > 0 && (
                    <span className="line-through text-red-500 text-sm">
                      ৳{medicine.price.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="sm:flex items-center justify-between text-sm">
                  <div>
                    {medicine.inStock ? (
                      <p className="text-green-500 bg-green-100 font-semibold px-2 rounded w-fit">
                        In Stock
                      </p>
                    ) : (
                      <p className="text-red-500 bg-red-100 font-semibold px-2 rounded w-fit">
                        Out of stock
                      </p>
                    )}
                  </div>
                  <span>Expires on: {medicine.expireDate}</span>
                </div>

                {medicine.requiredPrescription && (
                  <p className="text-sm text-red-500 font-medium">
                    Prescription Required
                  </p>
                )}

                <p className="text-sm">
                  <strong>Quantity Available:</strong> {medicine.quantity}
                </p>
              </CardContent>

              <div className="mt-6">
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  disabled={
                    !medicine.inStock ||
                    user?.role === "admin" ||
                    cartedProductQuantity >= medicine.quantity
                  }
                  className="w-full"
                >
                  {medicine.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {Array.isArray(relatedMedicines) && relatedMedicines.length > 0 && (
        <div>
          <h1 className="text-center text-2xl font-semibold pt-10">
            Related Medicines
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 p-6">
            {relatedMedicines?.map((med, index) => (
              <MedicineCard key={index} medicine={med} />
            ))}
          </div>
        </div>
      )}

      {/* Reviews + Form */}
      <div className="grid grid-cols-5 gap-6 mt-16">
        {Array.isArray(reviews) && reviews.length > 0 && (
          <div className={`py-10 ${userHasReview ? "col-span-5" : "col-span-5"}`}>
            <h3 className="text-3xl font-semibold text-center">
              Customer Reviews
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 py-6">
              {reviews.map((review, index) => {
                const isCurrentUser = review.userId?._id === user?.id;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white p-6 rounded-2xl shadow transition-transform flex flex-col"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        width={50}
                        height={50}
                        src={
                          "https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg"
                        }
                        alt={review.userId?.name || "Reviewer"}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <h4
                          className={`uppercase ${
                            isCurrentUser
                              ? "font-bold text-primary"
                              : "font-semibold"
                          }`}
                        >
                          {review.userId?.name}
                        </h4>
                      </div>
                    </div>
                    <p
                      className={`text-md ${
                        isCurrentUser
                          ? "font-semibold text-primary"
                          : "text-gray-700 text-center"
                      }`}
                    >
                      {review.title}
                    </p>
                    <hr className="my-2" />
                    <p className="text-gray-700 text-sm flex-grow line-clamp-5">
                      "{review.description}"
                    </p>
                    <div className="flex justify-between items-center mt-4 text-sm">
                      <div className="text-yellow-400">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </div>
                      <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        
      </div>

      {!userHasReview && (
          <div className="mt-10 mx-auto flex justify-center items-center">
            <div className=" lg:w-1/2 w-full rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 shadow-sm bg-white dark:bg-zinc-900 ">
              <h3 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
                Write a Review:{" "}
                <small className="text-violet-500">{medicine.name}</small>
              </h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="py-2">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter review title"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="py-2">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write your review here..."
                  />
                </div>

                <div>
                  <Label>Rating</Label>
                  <div className="flex items-center space-x-1 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={24}
                        onClick={() => handleStarClick(star)}
                        className={`cursor-pointer transition-colors ${
                          rating >= star
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!rating || !title || !user?.id}
                  className="w-full"
                >
                  Submit Review
                </Button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
