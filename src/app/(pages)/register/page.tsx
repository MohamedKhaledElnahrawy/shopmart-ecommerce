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
import { AuthRegisterInterface } from "@/Interfaces/authInterface";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { registerSchema } from "@/app/scema/auth.scema";

export default function Register() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(true);
  const [showRePass, setShowRePass] = useState(true);

  const myForm = useForm<AuthRegisterInterface>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
    mode: "all",
  });



  async function handleRegister(values: AuthRegisterInterface) {
    const isloading = toast.loading("Please wait...");

    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      if (data.message === "success") {
        console.log("✅ Registration successful");
        toast.success("account created successfully", { duration: 3000 });
        router.push("/login");
      } else {
        console.log("❌ Registration failed:", data.message);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message, { duration: 3000 });
      console.error("🚨 Register Error:", error.message);
    } finally {
      toast.dismiss(isloading);
    }
  }

  return (
    <div>
      <div className="w-1/2 mx-auto my-12">
        <h1 className="text-2xl font-bold my-6">Register Now</h1>

        <Form {...myForm}>
          <form
            onSubmit={myForm.handleSubmit(handleRegister)}
            className="space-y-5"
          >
            <FormField
              control={myForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Name:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name"
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={myForm.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password:</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showRePass ? "password" : "text"}
                        placeholder="Password"
                        {...field}
                        suppressHydrationWarning
                      />
                      {showRePass ? (
                        <Eye
                          size={18}
                          strokeWidth={1.5}
                          className="absolute right-2 top-2 cursor-pointer"
                          onClick={() => setShowRePass(false)}
                        />
                      ) : (
                        <EyeOff
                          size={18}
                          strokeWidth={1.5}
                          className="absolute right-2 top-2 cursor-pointer"
                          onClick={() => setShowRePass(true)}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={myForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="phone"
                      {...field}
                      suppressHydrationWarning
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full mt-4 bg-green-600 hover:bg-green-700"
              type="submit"
              suppressHydrationWarning
            >
              Register
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
