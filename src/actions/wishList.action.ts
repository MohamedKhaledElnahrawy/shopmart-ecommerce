import { getMyToken } from "@/utilities/GetMyToken";

export async function addToWishlistAction(productId: string) {
  const token = await getMyToken();

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist`,
    {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to add to wishlist");
  }

  const data = await response.json();

  return data;
}

// ******************************************************************

export async function getWishlistAction() {
  const token = await getMyToken(); // بنجيب التوكن بنفس طريقتك الذكية

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    method: "GET",
    headers: {
      token: `${token}`,
    },
    next: { revalidate: 0 } // عشان يقرأ البيانات الجديدة دايماً
  });

  if (!response.ok) {
     throw new Error("Failed to fetch wishlist");
  }
  const data = await response.json()

  return data;
}

// *********************************************************************

export async function removeFromWishlistAction(productId: string) {
  const token = await getMyToken();

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      token: `${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Could not remove from wishlist");
  }
  const data = await response.json()
  return data;
}