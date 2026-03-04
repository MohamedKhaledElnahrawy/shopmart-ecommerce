
"use client";
import { createContext, useState, ReactNode, useEffect } from "react";
import { addToWishlistAction, removeFromWishlistAction, getWishlistAction } from "@/actions/wishList.action";
import toast from "react-hot-toast";
import { getMyToken } from "@/utilities/GetMyToken";

interface WishlistItem {
  _id: string;
}

type WishlistContextType = {
  wishlistIds: string[];
  handleToggleWishlist: (productId: string, actionType?: "add" | "remove") => Promise<void>;
};

export const wishlistContext = createContext<WishlistContextType | null>(null);

export default function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    async function fetchInitialWishlist() {

      const token = await getMyToken()
      try {

        if (!token) {
        return; 
      }
        const res = await getWishlistAction();
        if (res.status === "success") {
          const ids = res.data.map((item: WishlistItem) => item._id);
          setWishlistIds(ids);
        }
      } catch (error) {
        console.error("Failed to sync wishlist ids", error);
      }
    }
    fetchInitialWishlist();
  }, []);

  async function handleToggleWishlist(productId: string, actionType?: "add" | "remove") {
    try {
      if (actionType === "remove") {
        const data = await removeFromWishlistAction(productId);
        if (data.status === "success") {
          setWishlistIds((prev) => prev.filter((id) => id !== productId));
          toast.success("Removed from wishlist 🗑️");
        }
        return;
      }

      const isFav = wishlistIds.includes(productId);
      
      if (isFav) {
        const data = await removeFromWishlistAction(productId);
        if (data.status === "success") {
          setWishlistIds((prev) => prev.filter((id) => id !== productId));
          toast.success("Removed from wishlist 🗑️");
        }
      } else {
        const data = await addToWishlistAction(productId);
        if (data.status === "success") {
          setWishlistIds((prev) => [...prev, productId]);
          toast.success("Added to wishlist ❤️");
        }
      }
    } catch (error) {
      console.error("Wishlist Error:", error);
      toast.error("Operation failed. Try again.");
    }
  }

  return (
    <wishlistContext.Provider value={{ wishlistIds, handleToggleWishlist }}>
      {children}
    </wishlistContext.Provider>
  );
}


// async function handleToggleWishlist(productId: string, actionType?: "add" | "remove") {
//   try {
//     // 1. حدد الأكشن المطلوب: لو اتبعت يدوي خده، لو متبعثش شوف هل المنتج موجود أصلاً؟
//     const isFav = wishlistIds.includes(productId);
//     const shouldRemove = actionType === "remove" || (actionType === undefined && isFav);

//     if (shouldRemove) {
//       const data = await removeFromWishlistAction(productId);
//       if (data.status === "success") {
//         setWishlistIds((prev) => prev.filter((id) => id !== productId));
//         toast.success("Removed from wishlist 🗑️");
//       }
//     } else {
//       const data = await addToWishlistAction(productId);
//       if (data.status === "success") {
//         setWishlistIds((prev) => [...prev, productId]);
//         toast.success("Added to wishlist ❤️");
//       }
//     }
//   } catch (error) {
//     console.error("Wishlist Error:", error);
//     toast.error("Operation failed. Try again.");
//   }
// }
















