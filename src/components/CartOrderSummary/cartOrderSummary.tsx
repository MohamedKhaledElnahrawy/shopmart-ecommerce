"use client";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { formatCurrency } from "./../../utilities/formateCurrency";
import { Loader2, Trash2 } from "lucide-react";
import { cartContext } from "@/context/cart.context";
import Link from "next/link";
import CheckOutSession from "../CheckOutSession/CheckOutSession";

export default function CartOrderSummary({
  handleClearCart,
  isLoading2,
}: {
  handleClearCart: () => void;
  isLoading2: boolean;
}) {

  const context = useContext(cartContext);

  return (
    <div className=" pb-12 sticky top-6 self-start h-fit">
      <div className="bg-white border rounded-lg p-5 h-fit   ">
        <h2 className="font-semibold mb-4 text-md">Order Summary</h2>

        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500">
            Subtotal ({context?.total?.numOfCartItems} items)
          </span>
          <span className="font-bold">
            {formatCurrency(context?.total?.data?.totalCartPrice || 0)}
          </span>
        </div>

        <div className="flex justify-between text-sm mb-4">
          <span className="text-gray-500">Shipping</span>
          <span className="text-green-600">Free</span>
        </div>

        <hr className="mb-4" />

        <div className="flex justify-between font-semibold text-md mb-6">
          <span>Total</span>
          <span> {formatCurrency(context?.total?.data?.totalCartPrice || 0)}</span>
        </div>
        <Button className=" bg-white  w-full border mb-5 py-5 rounded-lg text-gray-600 text-sm hover:bg-slate-50">
          <Link href={"/products"}>
          Continue Shopping
          </Link>
        </Button>

       <CheckOutSession cartId ={context?.total?.cartId || ''}/> 
      </div>
      <div className="flex justify-end mt-4">
        <Button
          disabled={isLoading2}
          onClick={handleClearCart}
          className="bg-white absolute bottom-0 right-0  font-bold border p-2 rounded-lg  gap-2 text-sm text-red-600  hover:text-white w-fit end hover:bg-red-600 "
        >
          {isLoading2 ? <Loader2  className="animate-spin w-4 h-4 text-red-600" /> : <Trash2 />}
          Clear cart
        </Button>
      </div>
    </div>
  );
}
