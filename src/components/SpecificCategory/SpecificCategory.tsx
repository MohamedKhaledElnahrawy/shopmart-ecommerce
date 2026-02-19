
"use client";
import { getSpecificCategoriesAction } from "@/actions/categories";
import { CategoryDetailsResponse } from "@/Interfaces/categoriesInterfaces";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CategoryDetailsSkeleton from "../skeleton/CategoryDetailSkeleton";
import Link from "next/link";

export default function SpecificCategory({ id }: { id: string }) {
  const [specificData, setSpecificData] =
    useState<CategoryDetailsResponse | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  //   *******************************************************************

  useEffect(() => {
    async function handleSpecificCategory() {
      try {
        setIsLoading(true);
        setError(false);

        const data: CategoryDetailsResponse =
          await getSpecificCategoriesAction(id);
        console.log("🚀 ~ handleSpecificCategory ~ data:", data);

        setSpecificData(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    handleSpecificCategory();
  }, [id]);

  //   *******************************************************************

  // loading
  if (isLoading) return <CategoryDetailsSkeleton />;

  //   *******************************************************************

 

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center border">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Something went wrong
          </h2>

          <p className="text-gray-500 mb-6">
            Failed to load this category. Please try again.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  //   *******************************************************************


  if (!specificData) {
    return null;
  }

  //   *******************************************************************

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
      <div className="max-w-4xl w-full p-6 bg-white rounded-lg shadow-lg text-center">
        {/* image */}
        <div className="w-full max-w-sm md:max-w-md aspect-4/5 mx-auto mb-6 rounded-lg overflow-hidden shadow-md relative">
          <Image
            src={specificData?.data?.image || "/category.png"}
            alt={specificData?.data?.name || "category"}
            className="object-cover"
            fill
          />
        </div>

        {/* name */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {specificData.data.name}
        </h1>

        {/* info */}
        <div className="text-gray-500 space-y-1">
          <p>
            <span className="font-semibold"></span>
            {specificData.data.slug}
          </p>
          <Link
            href={`/products`}
            className=" mt-3 group inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-medium rounded-md transition-all duration-300 hover:bg-gray-800 hover:scale-105 shadow-md"
          >
            Explore Products
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
