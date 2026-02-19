"use server";


export async function getAllCategoriesAction({
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
      `https://ecommerce.routemisr.com/api/v1/categories?${params.toString()}`,
      { next: { revalidate: 60 }}
    );

    if (!response.ok) {
      throw new Error("Failed to fetch categories: Server returned an error");
    }

    return await response.json();
  } catch (error) {
    console.error("🚨 Categories Action Error:", error);
    throw new Error("Could not load categories. Please check your connection or try again later.");
  }
}

// ********************************************************

//specific category
export async function getSpecificCategoriesAction(id: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
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
