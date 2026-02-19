"use client";
import { useContext, useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { wishlistContext } from "@/context/wishlist.context";

export default function WishlistHeart({ productId }: { productId: string }) {
  const context = useContext(wishlistContext);
  
  const [isLoading, setIsLoading] = useState(false);

  if (!context) return null;

  const { wishlistIds, handleToggleWishlist } = context;

  const isExist = wishlistIds.includes(productId);

  const onToggle = async () => {
    setIsLoading(true);
    await handleToggleWishlist(productId);
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center">
      {isLoading ? (
        <Loader2 className="animate-spin size-7 text-red-500" />
      ) : (
        <button
          onClick={onToggle}
          type="button"
          className="transition-transform active:scale-90 outline-none"
        >
          <Heart
            className={`size-7 transition-all duration-300 ${
              isExist 
                ? "fill-red-500 text-red-500" 
                : "text-gray-400 hover:text-red-300" 
            }`}
          />
        </button>
      )}
    </div>
  );
}


