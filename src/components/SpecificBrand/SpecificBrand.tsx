

"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import CategoryDetailsSkeleton from "../skeleton/CategoryDetailSkeleton";
import Link from "next/link";
import { getSpecificBrandsAction } from "@/actions/brands.action";
import { BrandDetailsResponse } from "@/Interfaces/brandInterfaces";

export default function SpecificBrand({id}:{id:string}) {
    const [specificData, setSpecificData] =
      useState<BrandDetailsResponse | null>(null);
  
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);



    


    
      useEffect(() => {
        async function handleSpecificBrand () {
          try {
            setIsLoading(true);
            setError(false);
    
            const data: BrandDetailsResponse =
              await getSpecificBrandsAction(id);
            console.log("🚀 ~ handleSpecificCategory ~ data:", data);
    
            setSpecificData(data);
          } catch (error) {
            console.log(error);
            setError(true);
          } finally {
            setIsLoading(false);
          }
        }
    
        handleSpecificBrand();
      }, [id]);



        if (isLoading) return <CategoryDetailsSkeleton />;
      


  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center border">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Something went wrong
          </h2>

          <p className="text-gray-500 mb-6">
            Failed to load this brand. Please try again.
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
    <div>
      <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
  <div className="max-w-4xl w-full p-6 bg-white rounded-lg shadow-lg text-center">
    
    <div className="w-full max-w-sm mx-auto mb-6 rounded-lg overflow-hidden border border-gray-100 bg-white relative aspect-square shadow-sm">
      <Image
        src={specificData?.data?.image || "/category.png"}
        alt={specificData?.data?.name || "brand"}
        className="object-contain p-4" 
        fill
        priority // fast loading for image 
      />
    </div>

    <h1 className="text-4xl font-extrabold text-gray-900 mb-2 uppercase tracking-wide">
      {specificData.data.name}
    </h1>

    <div className="flex flex-col items-center space-y-4">
      <p className="text-gray-400 font-medium">
        {specificData.data.slug}
      </p>

      <Link
        href={`/products`}
        className="group inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white text-sm font-bold rounded-full transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg active:scale-95"
      >
        Explore Products
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </div>
  </div>
</div>
 </div>
  )
}










