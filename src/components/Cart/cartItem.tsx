"use client";
import {
  clearCart,
  removeItemsFromCart,
  updateCart,
} from "@/actions/Cart.action";
import CartDetails from "@/components/CartDetails/cartDetails";
import { CartRes } from "@/Interfaces/CartInterface";
import { ShoppingCart } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import CartOrderSummary from "../CartOrderSummary/cartOrderSummary";
import EmptyCart from "../EmptyCart/EmptyCart";
import toast from "react-hot-toast";
import { cartContext } from "@/context/cart.context";

// *****************************************************


export default function Cart() {
  const context = useContext(cartContext);

  const [isLoading2, setIsLoading2] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const [loadingItems, setLoadingItems] = useState<{ [id: string]: boolean }>(
    {},
  );

  // *****************************************************
  // Get Cart Data
  async function handleGetUserCart() {
    try {

      await context?.handleNumberOfCartItemsAndDisplayData();
    } catch (error) {
      console.log(error);
    } finally {
      setIsInitialLoading(false);
    }
  }

  // *****************************************************
  // handleRemoveCartItems

  async function handleRemoveCartItems(id: string) {
    setLoadingItems((prev) => ({ ...prev, [id]: true }));
    try {
      const data: CartRes = await removeItemsFromCart(id);

      if (data.status == "success") {
        console.log(data);
      

        await context?.handleNumberOfCartItemsAndDisplayData();

    

        toast.success("product removed successfully", { duration: 2000 });
      }
    } catch (error) {
      console.log(error);
      toast.error("error , product did not remove");
    } finally {
      setLoadingItems((prev) => ({ ...prev, [id]: false }));
    }
  }

  // *****************************************************
  // handleClearCart
  async function handleClearCart() {
    setIsLoading2(true);
    try {
      const data = await clearCart();
      if (data.message == "success") {
        console.log(data);
        await context?.handleNumberOfCartItemsAndDisplayData();

        toast.success("cart cleared successfully", { duration: 2000 });
      }
    } catch (error) {
      console.log(`something wrong`, error);
      toast.error("something wrong", { duration: 2000 });
    } finally {
      setIsLoading2(false);
    }
  }

  // *****************************************************
  // handleUpdateCart
  async function handleUpdateCart(id: string, productCount: number) {
    setLoadingItems((prev) => ({ ...prev, [id]: true }));
    try {
      const data = await updateCart(id, productCount);
      if (data.status == "success") {

        await context?.handleNumberOfCartItemsAndDisplayData();
        toast.success("cart updated successfully", { duration: 2000 });
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("error occured", { duration: 2000 });
    } finally {
      setLoadingItems((prev) => ({ ...prev, [id]: false }));
    }
  }

  // *****************************************************
  useEffect(() => {
    handleGetUserCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // *****************************************************
  //  Cart Loading
  if (isInitialLoading) {
    return (
      <div className="mt-4 min-h-[80vh] flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="₩-12 h-12 bg-black flex items-center justify-center mr-3">
              <span className="text-white font-bold text-2xl p-3">S</span>
            </div>
            <span className="text-3xl font-bold text-black">ShopMart</span>
          </div>
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto"></div>
            <div className="mx-auto w-12 h-12 border-4 border-gray-100 border-b-gray-400 rounded-full animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  // *****************************************************

  return (
    <>
      <div className="max-w-7xl  mx-auto px-4 py-6">
        {/* Title */}
        <h1 className="text-xl font-bold mb-1 flex items-center  gap-3">
          <ShoppingCart /> Shopping Cart
        </h1>
        <p className="text-gray-500 ps-6 mb-6 text-sm">
          {context?.total?.numOfCartItems} items in your cart
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ****************************************************** */}
          {/* Mapping On Cart Item Details */}
          <div
            className={`${context?.total && context?.total.numOfCartItems > 0 ? "lg:col-span-2  space-y-4" : "space-y-4: lg:col-span-3"}  `}
          >
            {context?.total === null ? (
              <div>
                <div className="mt-4 min-h-[80vh] flex items-center justify-center bg-white">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-8">
                      <div className="₩-12 h-12 bg-black flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-2xl p-3">
                          S
                        </span>
                      </div>
                      <span className="text-3xl font-bold text-black">
                        ShopMart
                      </span>
                    </div>
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto"></div>
                      <div className="mx-auto w-12 h-12 border-4 border-gray-100 border-b-gray-400 rounded-full animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : context?.allProducts.length == 0 ? (
              <EmptyCart />
            ) : (
              context?.allProducts.map((product) => (
                <CartDetails
                  key={product.product._id}
                  product={product}
                  handleUpdateCart={handleUpdateCart}
                  handleRemoveCartItems={handleRemoveCartItems}
                  isLoading={loadingItems[product.product._id] || false}
                />
              ))
            )}
          </div>

          {/* ***************************************************************** */}
          {/*Cart Order Summary */}
          {context?.total && context?.total.numOfCartItems > 0 && (
            <CartOrderSummary
              isLoading2={isLoading2}
              handleClearCart={handleClearCart}
            />
          )}
        </div>
      </div>
    </>
  );
}
