import { BrandItem } from "@/Interfaces/brandInterfaces";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Brand({ brand }: { brand: BrandItem }) {
  return (
    <Link href={`/brands/${brand._id}`}>
      <div className="group rounded-xl p-4 flex flex-col items-center justify-center bg-white border hover:shadow-md transition-all duration-300 min-h-45">
        <div className="relative w-full h-28 mb-2">
          <Image
            src={brand.image}
            alt={brand.name}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105 p-2"
          />
        </div>

        <h3 className="text-sm md:text-md font-semibold text-gray-700 text-center">
          {brand.name}
        </h3>
      </div>
    </Link>
  );
}
