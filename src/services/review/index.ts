"use server"

import { TReview } from "@/types"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const createReview= async(reviewData:TReview) => {
  
    try {
       const res = await fetch(`${process.env.BASE_API}/review/create-review`, {
        method:"POST",
        headers: {
          Authorization:(await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json"
      },
        body:JSON.stringify(reviewData)
       })

       revalidateTag("REVIEW")

       return res.json()
        
    } catch (error:any) {
        return Error(error)
    }
}


export const getAllReviews = async () => {
    try {

      const res = await fetch(`${process.env.BASE_API}/review`);
  

      if (!res.ok) {
        throw new Error(`Failed to fetch reviews, status: ${res.status}`);
      }


      return await res.json();
    } catch (error: any) {
      console.error("Error fetching reviews:", error);
      return { error: error.message || "Something went wrong" };
    }
  }


export const getSpecificUserProductReview = async (reviewCondition:{userId:string, productId:string}) => {
    try {

      const res = await fetch(`${process.env.BASE_API}/review/user-product`,{
        method:"POST",
        body:JSON.stringify(reviewCondition),
        headers:{
          'Content-Type':"application/json"
        }
      });
  

      if (!res.ok) {
        throw new Error(`Failed to fetch reviews, status: ${res.status}`);
      }


      return await res.json();
    } catch (error: any) {
      console.error("Error fetching reviews:", error);
      return { error: error.message || "Something went wrong" };
    }
  };
  