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
import { ResetCodeType, resetschema } from "@/app/scema/auth.scema";

export default function ResetPassword() {
  const router = useRouter();

  const myForm = useForm<ResetCodeType>({
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver: zodResolver(resetschema),
    mode: "all",
  });

  async function handleResetPassword(values: ResetCodeType) {
    const isloading = toast.loading("Please wait...");

    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          method: "PUT",
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

      toast.success("Password changed successfully", { duration: 3000 });
      router.push("/login");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message, { duration: 3000 });
    } finally {
      toast.dismiss(isloading);
    }
  }

  return (
    <div >
      <div className="w-1/2 mx-auto my-12">
        <h1 className="text-2xl font-bold my-6">Reset Password</h1>

        <Form {...myForm}>
          <form
            onSubmit={myForm.handleSubmit(handleResetPassword)}
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
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="new password"
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
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
