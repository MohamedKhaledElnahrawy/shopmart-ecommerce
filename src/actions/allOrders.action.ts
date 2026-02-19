"use server";
export default async function getAllOrdersAction(cartOwnerId: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwnerId}`,
      { cache: 'no-store' } 
    );

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Action Error:", error);
    return []; 
  }
}