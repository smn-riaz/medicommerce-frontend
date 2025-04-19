"use server"
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


export const getAllUser = async() => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
        next:{
          tags:['USER']
        },
          headers: {
                  Authorization:(await cookies()).get("accessToken")!.value,
                  "Content-Type": "application/json"
              },
      })
      return await res.json()
  
    } catch (error:any) {
      throw Error(error)
    }
  }




  export const deleteSingleUser = async (userId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/user/${userId}`,
        
        {
          headers:{
            Authorization:""
          },
          method:"DELETE"
        }
      )
      revalidateTag("MEDICINE")

      const data = await res.json();
      return data;
      
    } catch (error: any) {
      return Error(error.message);
    }
  };