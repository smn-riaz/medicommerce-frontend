"use server"

import { TReview } from "@/types"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const createReview= async(reviewData:TReview) => {
  
    try {
       const res = await fetch(`${process.env.BASE_API}/review/create-review`, {
        method:"POST",
        headers: {
        //   Authorization:(await cookies()).get("accessToken")!.value,
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