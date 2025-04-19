

"use server"

import { cookies } from "next/headers"

import {jwtDecode} from 'jwt-decode'
import { FieldValues } from "react-hook-form"


export const registerUser = async(userData: FieldValues) => {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/create-user`, {
            method:'POST',
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(userData)
        })

        const result = await res.json()

    if(result.success){
        (await cookies()).set("accessToken", result.data.accessToken);

        (await cookies()).set("refreshToken", result.data.refreshToken)
    }

    return result

    } catch (error:any) {
        throw Error(error)
    }
}



export const loginUser = async(userData:FieldValues) => {


    try {  
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
            method:'POST',
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(userData)
        })

        const result = await res.json()

        if(result.success){
            (await cookies()).set("accessToken", result.data.accessToken);

            (await cookies()).set("refreshToken", result.data.refreshToken)
           
        }
    
        return result
    } catch (error:any) {
        return Error(error)
    }
    
    }





export const getCurrentUser = async () => {
    const accessToken = (await cookies()).get("accessToken")?.value;
    let decodedData = null;
  
    if (accessToken) {
      decodedData = await jwtDecode(accessToken);
      return decodedData;
    } else {
      return null;
    }
  };



  export const logout = async() => {
    (await cookies()).delete("accessToken")
  }