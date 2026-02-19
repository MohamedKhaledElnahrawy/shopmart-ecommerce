"use server";


export async function getProduct() {
  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products: API error");
    }

    return await response.json();
  } catch (error) {
    console.error("🚨 Products Action Error:", error);
    throw new Error("Something went wrong while fetching products. Please refresh the page.");
  }
}
