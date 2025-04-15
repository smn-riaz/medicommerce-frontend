
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
// import { registerUser } from "@/services/AuthServices";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "@/components/home/Logo";
import { registrationSchema } from "./registerValidation";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { getCurrentUser, registerUser } from "@/services/auth";
import { useUser } from "@/context/UserContext";





export default function RegisterForm() {

  const [showPassword, setShowPassword] = useState(false)
  const {setIsLoading, setUser} = useUser()




  const form = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const router = useRouter()

  const {
    formState: { isSubmitting },
  } = form;


  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");
 

  const searchParams = useSearchParams()
  
  const redirect = searchParams.get("redirectPath")


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser(data);

       const user = await getCurrentUser()
  
      if (res?.success) {
        setUser(user)

        toast.success(res?.message, {duration:1400});

        if(redirect){
          router.push(redirect)
        } else {
     
          router.push(`/${user.role}`)
        }
        
      } else {
        toast.error(res?.message,{duration:1400});
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center justify-between space-x-4 ">
        <div>
          <h1 className="text-xl font-semibold">Register Now</h1>
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-4">Name</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-4">Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value || ""} />
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
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-4">Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>

                {passwordConfirm && password !== passwordConfirm ? (
                  <FormMessage> Password does not match </FormMessage>
                ) : (
                  <FormMessage />
                )}
              </FormItem>
            )}
          />

          <Button
            disabled={!!passwordConfirm && password !== passwordConfirm}
            type="submit"
            className="mt-5 w-full"
          >
            {isSubmitting ? "Registering...." : "Register"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Already have an account? <Link href="/login" className="text-primary"> Login
        </Link>
      </p>
    </div>
  );
}