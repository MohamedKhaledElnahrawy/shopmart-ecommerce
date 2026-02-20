"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLoginInterface } from "@/Interfaces/authInterface";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { loginSchema } from "@/app/scema/auth.scema";
import Link from "next/link";
import { signIn, SignInResponse } from "next-auth/react";
import toast from "react-hot-toast";

export default function Register() {
  const [showPass, setShowPass] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const myForm = useForm<AuthLoginInterface>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "all",
  });
async function handleLogin(values: AuthLoginInterface) {
  setIsSubmitting(true); 
  
  try {
    const response: SignInResponse | undefined = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (response?.ok) {
      toast.success("Logged in successfully", { duration: 2000 });
      window.location.href = "/"; 
    } else {
      toast.error(response?.error || "Login failed", { duration: 2000 });
      myForm.reset();
    }
  } catch (error) {
    console.error(error);
  } finally {
    setIsSubmitting(false); 
  }
}
  return (
    <div>
      <div className="w-1/2 mx-auto my-12">
        <h1 className="text-2xl font-bold my-6">Login Now</h1>

        <Form {...myForm}>
          <form
            onSubmit={myForm.handleSubmit(handleLogin)}
            className="space-y-5"
          >
            <FormField
              control={myForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email"
                      {...field}
                      suppressHydrationWarning
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={myForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div>

                      <Input
                        suppressHydrationWarning
                        type={showPass ? "password" : "text"}
                        placeholder="password"
                        {...field}
                      />

                      {showPass ? (
                        <Eye
                          size={18}
                          strokeWidth={1.5}
                          className="absolute right-2 top-2 cursor-pointer"
                          onClick={() => setShowPass(false)}
                        />
                      ) : (
                        <EyeOff
                          size={18}
                          strokeWidth={1.5}
                          className="absolute right-2 top-2 cursor-pointer"
                          onClick={() => setShowPass(true)}
                        />
                      )}
                      </div>
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-4">
  <div className="flex justify-between items-center">
   <Button
  className="mt-4 bg-green-600 hover:bg-green-700 flex items-center gap-2"
  type="submit"
  disabled={isSubmitting} 
  suppressHydrationWarning
>
  {isSubmitting ? (
    <>
      <Loader2 className="animate-spin size-4" /> 
      Please wait...
    </>
  ) : (
    "Login"
  )}
</Button>
    <Link
      className="text-sm text-blue-600 hover:underline cursor-pointer"
      href={"/forgetPassword"}
    >
      Forget password?
    </Link>
  </div>

  <p className="text-sm text-gray-600">
    Do not have an account?
    <Link href={"/register"} className="text-blue-600 font-semibold hover:underline cursor-pointer">
      Sign up now
    </Link>
  </p>
</div>
          </form>
        </Form>
      </div>
    </div>
  );
}



