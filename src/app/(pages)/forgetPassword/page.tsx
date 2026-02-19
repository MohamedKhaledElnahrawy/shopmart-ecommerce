"use client";
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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ForgetPasswordType } from "@/app/scema/auth.scema";
import { forgetPasswordSchema } from "./../../scema/auth.scema";

export default function ForgetPassword() {
    const router = useRouter();

  const myForm = useForm<ForgetPasswordType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgetPasswordSchema),
    mode: "all",
  });

  async function handleForgetPassword(values: ForgetPasswordType) {
    const isloading = toast.loading("Please wait...");

    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        },
      );

      const data = await response.json();
      console.log(data);

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        if (data.statusMsg === "success") {
          toast.success("code sent to your email", { duration: 3000 });
          router.push("/verifyCode");
        } else {
          console.log("❌ login failed:", data.message);
        }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message, { duration: 3000 });
    } finally {
      toast.dismiss(isloading);
    }
  }

  return (
    <div>
      <div className="w-1/2 mx-auto my-12">
        <h1 className="text-2xl font-bold my-6">Forget Password</h1>

        <Form {...myForm}>
          <form
            onSubmit={myForm.handleSubmit(handleForgetPassword)}
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

            <Button
              className=" mt-4 bg-green-600 hover:bg-green-700"
              type="submit"
              suppressHydrationWarning
            >
              forget
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
