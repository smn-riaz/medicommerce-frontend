
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";

// import { loginUser, reCaptchaTokenVerification, registerUser } from "@/services/AuthServices";
import { toast } from "sonner";


import {useRouter } from "next/navigation";

import { loginSchema } from "./loginValidation";
import Logo from "@/components/home/Logo";
import { loginUser } from "@/services/auth";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from "@/context/UserContext";




export default function LoginForm() {

  const [showPassword, setShowPassword] = useState(false)
  const {setIsLoading} = useUser()

  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;




// const searchParams = useSearchParams()

// const redirect = searchParams.get("redirectPath")

const router = useRouter()




  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  
    try {
      const res = await loginUser(data);
      if (res?.success) {
        toast.success(res?.message, {duration:1400})
        setIsLoading(true)
        // if(redirect){
        //   router.push(redirect)
        // } else {
            router.push("/")
        // }
      } else {
        toast.error(res?.message,{duration:1400});
        
      }
    } catch (err: any) {
      console.error(err);
    }
  }



  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center justify-between space-x-4 ">
        <div>
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="font-extralight text-sm text-gray-600">
          Healthtech for a Better You
          </p>
        </div>
        <Logo />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
         
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-4">Email</FormLabel>
                <FormControl>
                  <Input type="email"  {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-4">Password <Checkbox onClick={() => setShowPassword(!showPassword)} /></FormLabel>
                
                <FormControl>
                  <Input type={`${showPassword ? "text":"password"}`} {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />



          <Button
            type="submit"
            className="mt-5 w-full"
          >
            {isSubmitting ? "Logging...." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Do not have any account? <Link href="/register" className="text-primary"> Register
        </Link>
      </p>
    </div>
  );
}