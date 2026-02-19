

"use client";
import { getUserCart } from "@/actions/Cart.action";
import { createContext, useEffect, useState, ReactNode } from "react";
import { CartItem, CartRes } from "@/Interfaces/CartInterface";

type CartContextType = {
  numOfCartItems: number | null;
  setNumOfCartItems: React.Dispatch<React.SetStateAction<number | null>>;
  allProducts: CartItem[];
  setAllProducts: React.Dispatch<React.SetStateAction<CartItem[]>>;
  total: CartRes | null;
  setTotal: React.Dispatch<React.SetStateAction<CartRes | null>>;
  handleNumberOfCartItemsAndDisplayData: () => Promise<CartRes | undefined>;
};

export const cartContext = createContext<CartContextType | null>(null);

type Props = {
  children: ReactNode;
};

export default function CartProvider({ children }: Props) {
  const [numOfCartItems, setNumOfCartItems] = useState<number | null>(null);
  const [allProducts, setAllProducts] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<CartRes | null>(null);

  async function handleNumberOfCartItemsAndDisplayData() {
    try {
      const data = await getUserCart();

      if (data?.status === "success") {
        setAllProducts(data?.data?.products);
        setTotal(data);

        let sum = 0;
        data?.data?.products.forEach((product) => {
          sum += product.count;
        });
        setNumOfCartItems(sum);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleNumberOfCartItemsAndDisplayData();
  }, []);

  return (
    <cartContext.Provider
      value={{
        numOfCartItems,
        setNumOfCartItems,
        handleNumberOfCartItemsAndDisplayData,
        allProducts,
        setAllProducts,
        total,
        setTotal,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
