"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Star } from "lucide-react";
import { toast } from "sonner";

import { motion } from "framer-motion";

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

export default function MedicineDetail({
  medicine,review
}: {
  medicine: TMedicineResponse,
  review:TReviewResponse
}) {
  const router = useRouter();
  const { user } = useUser();
  const dispatch = useAppDispatch();

  const [selectedImage, setSelectedImage] = useState(medicine.imageUrl[0]);
  const { cartedProductQuantity } = useAppSelector((state) =>
    specificProductQuantitySelector(state, { id: medicine._id })
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  const handleStarClick = (value: number) => {
    setRating(value);
  };


  const handleSubmit = async() => {
  try {
    if (title.length < 3 || title.length > 100) {
      toast.error("Title must be between 3 and 100 characters.");
      return;
    }
  
    if (description.length < 10 || description.length > 1000) {
      toast.error("Description must be between 10 and 1000 characters.");
      return;
    }

    if(user?.id){
       toast.error("Please, login first!");

    }
  
    if (rating === 0) {
      toast.error("Please give a rating.");
      return;
    }
  
    if(user?.id && medicine?._id){
      const reviewData:TReview = {
        userId:user?.id as string,
        productId:medicine._id,
        title,
        description,
        rating: rating,
      }
  

  

      const res = await createReview(reviewData)
  
      if(res?.success){
        toast.success(res.message);
        setTitle('')
        setDescription("")
        setRating(0)
      } else {
        toast.error(res.message);
      }
    }
  } catch (error) {
    toast.error("Something went wrong!")
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
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Images */}
          <div>
            <Image
              width={400}
              height={300}
              src={selectedImage}
              alt={medicine.name}
              className="max-w-xs h-64 object-cover rounded-lg shadow-lg"
            />

            <div className="mt-4 flex space-x-4 justify-start">
              {medicine.imageUrl.map((image, index) => (
                <Image
                  width={70}
                  height={70}
                  key={index}
                  src={image}
                  alt={`${medicine.name} Thumbnail ${index + 1}`}
                  className={`object-cover rounded-lg cursor-pointer transition-transform hover:scale-105 ${
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
                <CardDescription className="text-sm text-muted-foreground">
                  {medicine.type}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-lg text-muted-foreground">
                  {medicine.description}
                </p>

                <div className="text-sm text-muted-foreground">
                  <strong>Manufacturer:</strong> {medicine.manufacturer}
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-xl font-semibold">
                    ৳
                    {(medicine.price * (1 - medicine.discount / 100)).toFixed(
                      2
                    )}
                  </span>
                  {medicine.discount > 0 && (
                    <span className="text-sm line-through text-red-500">
                      ৳{medicine.price.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="sm:flex items-center justify-between gap-6 text-sm text-muted-foreground">
                  <div className="pb-4 sm:pb-0">
                    {medicine.inStock ? (
                      <p className="text-green-500 border bg-green-100 w-1/2 sm:w-full text-center font-semibold px-1 rounded">
                        In Stock
                      </p>
                    ) : (
                      <p className="text-red-500 border bg-red-100 w-1/2 sm:w-full text-center font-semibold px-1 rounded">
                        Out of stock
                      </p>
                    )}
                  </div>
                  <span>Expires on: {medicine.expireDate}</span>
                </div>

                {medicine.requiredPrescription && (
                  <div className="text-sm text-red-500">
                    Prescription Required
                  </div>
                )}

                <div className="text-sm text-muted-foreground">
                  <strong>Quantity Available:</strong> {medicine.quantity}
                </div>
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

      {/* Review Section */}
      {
        review ? 
        <div className="grid grid-cols-4 place-items-center">
        <div className="col-span-4 md:col-span-2 lg:col-span-1">
          <h3 className="text-md text-slate font-semibold text-center">Your review</h3>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-transform h-full flex flex-col"
          >
            <div className="flex items-center gap-4 mb-4">
              <Image
                width={50}
                height={50}
                src={"https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg"}
                alt={review.userId?.name as string}
                className="rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold uppercase">
                  {review.userId?.name}
                </h4>
              </div>
            </div>
      
            <p className="text-md text-center text-gray-700">
              {review.title || "Review"}
            </p>
            <hr className="py-1" />
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
        </div>
      </div>
      
      
        :
        <div className="mt-20  mx-auto flex justify-center items-center">
        <div className="rounded-xl w-full sm:w-[500px] border p-6 shadow-sm bg-white">
          <h3 className="text-xl font-semibold mb-4">Write a Review : <small className="text-violet-400">{medicine.name}</small></h3>

          <div className="space-y-4">
            {/* Review Title */}
            <div>
              <Label htmlFor="title" className="py-2 block">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your review title"
              />
            </div>

            {/* Review Description */}
            <div>
              <Label htmlFor="description" className="py-2 block">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write your thoughts here..."
              />
            </div>

            {/* Rating Section */}
            <div>
              <Label className="py-2 block">Rating</Label>
              <div className="flex items-center space-x-1 pt-1">
                {[1, 2, 3, 4, 5].map((starValue) => (
                  <Star
                    key={starValue}
                    size={24}
                    onClick={() => handleStarClick(starValue)}
                    className={`cursor-pointer transition-colors ${
                      rating >= starValue
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button onClick={handleSubmit} disabled={!rating || !title || !user?.id}>
              Submit Review
            </Button>
          </div>
        </div>
      </div>
      }
    </div>
  );
}
