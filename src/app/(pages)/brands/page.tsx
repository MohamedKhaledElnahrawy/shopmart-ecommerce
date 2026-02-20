import Brand from "@/components/Brand/Brand";
import {
} from "@/Interfaces/categoriesInterfaces";

import React from "react";
import { getAllBrandsAction } from '@/actions/brands.action';
import { BrandItem, BrandResponse } from "@/Interfaces/brandInterfaces";

export default async function Brands() {
  const data: BrandResponse = await getAllBrandsAction({
    limit: 20,
  });
  console.log("🚀 ~ handleAllbrands ~ data:", data);


  return (
    <div>
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Brands Page</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data?.data?.length > 0 ? (
            data.data.map((brand: BrandItem) => (
              <Brand key={brand._id} brand ={brand} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">
              No brands Available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

