import { getAllCategoriesAction } from "@/actions/categories";
import Category from "@/components/Category/Category";
import {
  CategoryResponse,
  CategoryItem,
} from "@/Interfaces/categoriesInterfaces";

import React from "react";

export default async function Categories() {
  const data: CategoryResponse = await getAllCategoriesAction({
    limit: 20,
    page: 1,
  });
  console.log("🚀 ~ handleAllCategories ~ data:", data);


  return (
    <div>
      <div className="max-w-7xl mx-auto p-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data?.data?.length > 0 ? (
            data.data.map((category: CategoryItem) => (
              <Category key={category._id} category={category} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">
              No Categories Available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
