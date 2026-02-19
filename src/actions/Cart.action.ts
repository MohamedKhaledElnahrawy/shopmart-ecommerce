"use server";
import { CartRes, ShippingAddress } from "@/Interfaces/CartInterface";
import { getMyToken } from "@/utilities/GetMyToken";

export async function addToCartAction(productId: string) {

  const token = await getMyToken();

  if (!token) {
    return {
      status: "unauthorized",
      message: "please login first",
    };
  }

  if (token) {
    console.log("🚀 ~ addToCartAction ~ token:", token)
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: {
          token:`${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
        credentials: "include",
      },
    );
    const data = await response.json();

    return data;
  } else {
    return null;
  }
}



export async function getUserCart() {
  const token = await getMyToken();
  if (!token) {
    throw new Error("please login first to add your products to card");
  }
  try {
    
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          token:`${token}`,
        },
      },
    );
    const data: CartRes = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function removeItemsFromCart(id: string) {
  const token = await getMyToken();

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
      method: "DELETE",
      headers: {
        token: token as string,
      },
    },
  );
  const data = response.json();
  return data;
}

export async function clearCart() {
  const token = await getMyToken();

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "DELETE",
    headers: {
      token: token as string,
    },
  });
  const data = await response.json();
  return data;
}

export async function updateCart(id: string, newCount: number) {
  const token = await getMyToken();
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        count: String(newCount),
      }),
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
    },
  );
  const data = await response.json();

  return data;
}

export async function checkOutAction(cartId: string , shippingAddress : ShippingAddress) {

  const token = await getMyToken();
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
 
  if (!token) {
    return {
      status: "unauthorized",
      message: "please login first",
    };
  }

  if (token) {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${siteUrl}`,
      {
        method: "POST",
        body: JSON.stringify({ shippingAddress }),
        headers: {
          token:`${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
        credentials: "include",
      },
    );
    const data = await response.json();

    return data;
  } 
 
}




