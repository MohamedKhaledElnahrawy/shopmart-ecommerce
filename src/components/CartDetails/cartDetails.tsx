"use client";
import { CartItem } from "@/Interfaces/CartInterface";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { formatCurrency } from "@/utilities/formateCurrency";
import { Loader2 } from "lucide-react";

export default function CartDetails({
  product,
  handleUpdateCart,
  handleRemoveCartItems,
  isLoading,
}: {
  product: CartItem;
  handleUpdateCart: (id: string, productCount: number) => Promise<void>;
  handleRemoveCartItems: (id: string) => Promise<void>;
  isLoading: boolean;
}) {


  return (
    <div>
      <div
        className=" 
              bg-white border rounded-lg p-4
              flex flex-col
              md:flex-row md:items-center md:justify-between
              gap-4
            "
      >
        <div className="flex gap-4 my-2">
          
          {/* Image */}
          <div className="w-20 h-20 bg-gray-200 rounded shrink-0">
            <Image
              src={product.product.imageCover}
              alt={product.product.title}
              width={500}
              height={500}
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-sm md:text-lg">
                {product.product.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-500">
                {product.product.brand.name} . {product.product.category.name}
              </p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-2 mt-2">
              <Button
                disabled={isLoading}
                onClick={() =>
                  handleUpdateCart(product.product._id, product.count - 1)
                }
                className="w-8 h-8 border rounded hover:bg-slate-600"
              >
                −
              </Button>

              <span className="text-sm">
                {isLoading ? (
                  <Loader2 className="animate-spin w-4 h-4 text-slate-800" />
                ) : (
                  product.count
                )}
              </span>
              <Button
                disabled={isLoading}
                onClick={() =>
                  handleUpdateCart(product.product._id, product.count + 1)
                }
                className=" w-8 h-8 border rounded hover:bg-slate-600"
              >
                +
              </Button>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex justify-between md:flex-col md:items-end">
          <div className="flex flex-col items-end gap-1 my-2">

            {/* Price per item */}
            <p className="text-sm text-gray-500">
              {formatCurrency(product.price)} × {product.count}
            </p>

            {/* Total price for this item */}
            <p className="text-lg font-bold">
              {formatCurrency(product.price * product.count)}
            </p>
          </div>
         
          <div className="text-right">
            <p className="text-xs text-gray-500">each</p>
            <div className=" flex justify-center items-center gap-2 mt-6 pl-2">
              <Button
                disabled={isLoading}
                onClick={() => handleRemoveCartItems(product.product._id)}
                className="bg-transparent text-xs md:text-sm p-0 text-red-500 flex items-center justify-center gap-2 relative group  hover:bg-transparent"
              >
                {/* Loader */}
                {isLoading && (
                  <Loader2 className="animate-spin w-4 h-4 text-red-600" />
                )}

                {/* Remove */}
                <span className="relative">
                  Remove
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
