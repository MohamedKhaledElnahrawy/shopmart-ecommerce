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
import { Eye, EyeOff } from "lucide-react";
import { loginSchema } from "@/app/scema/auth.scema";
import Link from "next/link";
import { signIn, SignInResponse } from "next-auth/react";
import toast from "react-hot-toast";

export default function Register() {
  const [showPass, setShowPass] = useState(true);

  const myForm = useForm<AuthLoginInterface>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  async function handleLogin(values: AuthLoginInterface) {
    const isloading = toast.loading("Please wait...");
    const response:SignInResponse | undefined = await signIn("credentials", {
      
      email: values.email,
      password: values.password,
      redirect: false,
      // callbackUrl: "/"
    });
    console.log(response);
    if (response?.ok) {
      toast.success("loded in successfully", { duration: 2000 });

      // eslint-disable-next-line react-hooks/immutability
      window.location.href = "/"; 

    } else {
      toast.error(response?.error || "login failed", { duration: 2000 });
      myForm.reset();
    }
    toast.dismiss(isloading);
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

            <div className="flex justify-between items-center">
              <Button
                className=" mt-4 bg-green-600 hover:bg-green-700"
                type="submit"
                suppressHydrationWarning
              >
                Login
              </Button>
              <Link
                className="text-sm text-blue-600 hover:underline"
                href={"/forgetPassword"}
              >
                forget password
              </Link>
              {/* <Link href={"/register"} className="text-sm text-blue-600 hover:underline ml-4">
              Dont have an account? Register
            </Link>  */}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
