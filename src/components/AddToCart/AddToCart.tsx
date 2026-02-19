

"use client";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { CartRes } from "./../../Interfaces/CartInterface";
import toast from "react-hot-toast";
import { addToCartAction } from "@/actions/Cart.action";
import { useRouter } from "next/navigation";
import { cartContext } from "@/context/cart.context";

export default function AddToCart({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const context = useContext(cartContext);

  async function addToCart(productId: string) {
    console.log("🚀 ~ addToCart ~ productId:", productId)
    
    try {
      setIsLoading(true);
      const data: CartRes = await addToCartAction(productId);

      if (data?.status == "success") {
        await context?.handleNumberOfCartItemsAndDisplayData();
        toast.success(data.message + "");
      }
      if (data?.status === "unauthorized") {
        toast.error("Please login first");
        router.push("/login");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("🚀 ~ addToCart ~ error:", error)
      toast.error("Network error, please try again");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      className="w-full gap-2" 
      onClick={() => addToCart(productId)}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : <ShoppingCart className="size-5" />}
      Add To Cart
    </Button>
  );
}
