/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { IMedicine } from "@/types"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const createMedicine = async(medicineData:IMedicine) => {
  
    try {
       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product/create-product`, {
        method:"POST",
        headers: {
          Authorization:(await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json"
      },
        body:JSON.stringify(medicineData)
       })

       revalidateTag("MEDICINE")

       return res.json()
        
    } catch (error:any) {
        return Error(error)
    }
}




export const getAllMedicine = async (params?: Record<string, string>) => {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product${query ? `?${query}` : ""}`,
      {
        next: {
          tags: ['MEDICINE'],
          revalidate: 5
        },
        
      }
    );

    if (!res.ok) {
      const text = await res.text(); // get full message
      console.error('Fetch error:', res.status, text);
      throw new Error(`Failed to fetch medicines: ${res.status}`);
    }

    return await res.json();
  } catch (error: any) {
    console.error("getAllMedicine error:", error);
    throw new Error(error.message || 'Something went wrong');
  }
}


export const getSingleMedicine = async (medicineId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/product/${medicineId}`,
        {
          next: {
            tags: ["MEDICINE"],
          },
        }
      );
      const data = await res.json();
      return data;
      
    } catch (error: any) {
      return Error(error.message);
    }
  };


  export const imageToLink = async(image:FormData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_IMGBB_API_LINK}?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
        method: 'POST',
        body: image,
      });

      return await res.json();

    } catch (error:any) {
      return Error(error)
    }
  
  }