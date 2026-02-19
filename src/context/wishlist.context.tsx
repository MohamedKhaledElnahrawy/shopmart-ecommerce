
"use client";
import { createContext, useState, ReactNode, useEffect } from "react";
import { addToWishlistAction, removeFromWishlistAction, getWishlistAction } from "@/actions/wishList.action";
import toast from "react-hot-toast";

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
      try {
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




















// "use client";
// import { createContext, useState, ReactNode, useEffect } from "react";
// import { addToWishlistAction, removeFromWishlistAction, getWishlistAction } from "@/actions/wishList.action";
// import toast from "react-hot-toast";

// interface WishlistItem {
//   _id: string;
// }

// type WishlistContextType = {
//   wishlistIds: string[];
//   handleToggleWishlist: (productId: string) => Promise<void>;
// };

// export const wishlistContext = createContext<WishlistContextType | null>(null);

// export default function WishlistProvider({ children }: { children: ReactNode }) {
//   const [wishlistIds, setWishlistIds] = useState<string[]>([]);

//   // مزامنة الـ IDs عند أول تحميل للموقع
//   useEffect(() => {
//     async function fetchInitialWishlist() {
//       try {
//         const res = await getWishlistAction();
//         if (res.status === "success") {
//           const ids = res.data.map((item: WishlistItem) => item._id);
//           setWishlistIds(ids);
//         }
//       } catch (error) {
//         console.error("Failed to sync wishlist ids", error);
//       }
//     }
//     fetchInitialWishlist();
//   }, []);

  
//   async function handleToggleWishlist(productId: string) {
//     try {
//       // 1. بننادي الأكشن (الـ API هيعمل Toggle لوحده)
//       const res = await addToWishlistAction(productId); 
      
//       if (res.status === "success") {
//         // 2. الـ API ده بيرجع مصفوفة الـ IDs الجديدة في res.data
//         const updatedIds = res.data; 
//         setWishlistIds(updatedIds);

//         // 3. هنا بقى "الذكاء": لو الـ ID لسه موجود في المصفوفة الجديدة، يبقى أضفناه
//         // لو الـ ID مش موجود، يبقى الـ API حذفه (وده اللي هيحصل في صفحة الـ Wishlist)
//         if (updatedIds.includes(productId)) {
//           toast.success("Added to wishlist ❤️");
//         } else {
//           toast.success("Removed from wishlist 🗑️");
//         }
//       }
//     } catch (error) {
//       console.error("Wishlist Error:", error);
//       toast.error("Operation failed");
//     }
//   }

//   return (
//     <wishlistContext.Provider value={{ wishlistIds, handleToggleWishlist }}>
//       {children}
//     </wishlistContext.Provider>
//   );
// }