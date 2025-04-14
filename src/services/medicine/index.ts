/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { IMedicine } from "@/types"
import { revalidateTag } from "next/cache"

export const createMedicine = async(medicineData:IMedicine) => {
    try {
       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product/create-product`, {
        method:"POST",
        headers:{
            Authorization: "",
            "content-Type":'application/json'
        },
        body:JSON.stringify(medicineData)
       })

       revalidateTag("MEDICINE")

       return res.json()
        
    } catch (error:any) {
        return Error(error)
    }
}


export const getAllMedicine = async() => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product`, {
      next:{
        tags:['MEDICINE']
      },
      cache:'force-cache'
    })
    return await res.json()

  } catch (error:any) {
    throw Error(error)
  }
}



// export const updateMedicine = async(MedicineInfo, medicineId):Promise<any> => {

//     try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/medicine/update-medicine`, {
//             method:"PATCH",
//             headers:{
//                 Authorization:""
//             },
//             body:MedicineInfo
//         })

//         revalidateTag("MEDICINE")

//         return await res.json()

//     } catch (error:any) {
//         throw Error(error)
//     }
// }


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