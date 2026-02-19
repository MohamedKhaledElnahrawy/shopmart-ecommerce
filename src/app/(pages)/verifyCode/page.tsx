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
import { verifyschema, VerifyCodeType } from "@/app/scema/auth.scema";

export default function VerifyCode() {
    const router = useRouter();

  const myForm = useForm<VerifyCodeType>({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(verifyschema),
    mode: "all",
  });

  async function handleVerifyCode(values: VerifyCodeType) {
    const isloading = toast.loading("Please wait...");

    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
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

       
          toast.success("code verified successfully", { duration: 3000 });
          router.push("/resetPassword");       

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
        <h1 className="text-2xl font-bold my-6"> Reset Password</h1>

        <Form {...myForm}>
          <form
            onSubmit={myForm.handleSubmit(handleVerifyCode)}
            className="space-y-5"
          >
            <FormField
              control={myForm.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reset Code:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="reset code"
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
              Verify
            </Button>

          </form>
        </Form>
      </div>
    </div>
  );
}
