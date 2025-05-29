
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

import { toast } from "sonner";


import {useRouter, useSearchParams } from "next/navigation";

import { loginSchema } from "./loginValidation";
import Logo from "@/components/home/Logo";
import { getCurrentUser, loginUser } from "@/services/auth";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from "@/context/UserContext";

import {AnimatePresence, motion} from 'framer-motion'


export default function LoginForm() {

  const searchParams = useSearchParams()

const redirect = searchParams.get("redirectPath")

const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)

  const [vanishForm, setVanishForm] = useState(false)

  const {setIsLoading, setUser} = useUser()

  const [autoFillCredentials, setAutoFillCredentials] = useState(false)


  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' } 
    
  });

 
  useEffect(() => {
    if (autoFillCredentials) {
      form.reset({
        email: 'admin@gmail.com',
        password: 'aaaaaa',
      });
    } else {
      form.reset({
        email: '',
        password: '',
      });
    }
  }, [autoFillCredentials])


  const {
    formState: { isSubmitting },
  } = form;




const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  try {
    const res = await loginUser(data);

    setIsLoading(true)
    const user = await getCurrentUser()

    setVanishForm(true)

    if (res?.success) {
      setUser(user)

      toast.success(res?.message, {duration:1400})

      if(redirect){
        router.push(redirect)
      } else {
   
        router.push(`/${user?.role}`)
      }
    } else {
      toast.error(res?.message,{duration:1400});
      
    }
  } catch (err: any) {
    console.error(err);
  }
}


  return (
   <div><AnimatePresence>

     {!vanishForm &&   <motion.div
      
      
            initial={{ opacity: 1, x: 0 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: 150 }}
  transition={{ duration: 1, delay: 0.1 }}
     className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center justify-between space-x-4 ">
        <div>
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="font-extralight text-sm text-gray-600">
          Healthtech for a Better You
          </p>
        </div>
        <Logo />
      </div>

<div className="flex justify-center items-center pt-6">
<Button onClick={() => setAutoFillCredentials(!autoFillCredentials)} className={`flex ${autoFillCredentials ? "bg-[#b65151] ":"bg-[#0e8f0e]"} hover:bg-[paused] cursor-pointer justify-center items-center py-2 gap-2`}>{!autoFillCredentials?"Click to autofill admin credentials" : "Clear admin credentials"}</Button>
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
    </motion.div>
    }
    </AnimatePresence>
   </div>
  );
}