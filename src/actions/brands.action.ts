'use server'
export async function getAllBrandsAction({
  limit,
  page,
}: {
  limit?: number;
  page?: number;
}) {
  try {
    const params = new URLSearchParams();
    if (limit) params.append("limit", limit.toString());
    if (page) params.append("page", page.toString());

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands?${params.toString()}`,
      { next: { revalidate: 60 }}
    );

    if (!response.ok) {
      throw new Error("Failed to fetch brands: Server responded with an error");
    }

    return await response.json();
  } catch (error) {
    console.error("🚨 Brands Action Error:", error);
    throw new Error("Unable to load brands. Please try again.");
  }
}

// *****************************************************************************

export async function getSpecificBrandsAction(id: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
    {
   next: { revalidate: 60 },
    },
  );
  const data = await response.json();

  if (!response.ok) {
    console.log("🚨 API ERROR:", );
    throw new Error("Failed to fetch category");
  }
  return data;
}