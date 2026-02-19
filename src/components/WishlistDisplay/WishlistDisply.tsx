
"use client";
import React, { useEffect, useState, useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import AddToCart from "@/components/AddToCart/AddToCart";
import { Loader2, Star, Heart,  } from "lucide-react";
import { getWishlistAction } from "@/actions/wishList.action";
import { wishlistContext } from "@/context/wishlist.context";
import { formatCurrency } from "@/utilities/formateCurrency";

export default function WishlistDisplay() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [wishlistData, setWishlistData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const context = useContext(wishlistContext);
  if (!context) return null;
  const { handleToggleWishlist } = context;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const res = await getWishlistAction();
        if (res.status === "success") {
          setWishlistData(res.data);
        }
      } catch (error) {
        console.error("Wishlist Load Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  async function removeItem(id: string) {
    //in case catch error, return to the old version of wishlist data
    const previousWishlist = [...wishlistData];
    
    // trick for fast removing for data
    setWishlistData((prev) => prev.filter((item) => item._id !== id));
    setDeletingId(id);

    try {
      await handleToggleWishlist(id, "remove");
    } catch (error) {
      console.error("Delete Error:", error);

    // return to the old version of wishlist data or return the deleted producted
      setWishlistData(previousWishlist);
      alert("Failed to remove item. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  if (isLoading)
    return (
      <div className="mt-4 min-h-[80vh] flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-12 bg-black flex items-center justify-center mr-3">
              <span className="text-white font-bold text-2xl p-3">S</span>
            </div>
            <span className="text-3xl font-bold text-black">ShopMart</span>
          </div>
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    );

  if (wishlistData.length === 0)
    return (
      <div className="text-center py-20 text-xl font-medium text-gray-500">
        Your wishlist is empty ❤️
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto my-10 px-4">
      {wishlistData.map((product) => (
        <Card
          key={product._id}
          className="relative flex flex-col justify-between overflow-hidden shadow-md"
        >
          <div className="relative h-60 w-full overflow-hidden bg-gray-50">
            <Image
              src={product.imageCover}
              alt={product.title}
              fill
              className="object-contain p-2"
            />

            <button
              onClick={() => removeItem(product._id)}
              disabled={deletingId === product._id}
              className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm min-w-10 min-h-10 flex items-center justify-center transition-all hover:scale-110"
            >
              {deletingId === product._id ? (
                <Loader2 className="size-5 animate-spin text-red-500" />
              ) : (
                <Heart className="size-6 fill-red-500 text-red-500" />
              )}
            </button>
          </div>

          <CardHeader className="pb-2">
            <p className="text-xs text-muted-foreground uppercase font-semibold">
              {product.category?.name}
            </p>
            <CardTitle className="line-clamp-1 text-base font-bold">
              {product.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="pb-2 px-3 flex justify-between items-center">
            <p className="font-bold text-green-700">
              {formatCurrency(product.price)}
            </p>
            <div className="flex items-center gap-1 text-sm px-2 py-1 rounded-md">
              <Star className="size-4 text-amber-400 fill-amber-400" />
              <span className="font-medium text-amber-700">
                {product.ratingsAverage}
              </span>
            </div>
          </CardContent>

          <div className="p-4 pt-2">
            <AddToCart productId={product._id} />
          </div>
        </Card>
      ))}
    </div>
  );
}