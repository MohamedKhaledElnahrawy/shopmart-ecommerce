import React from "react";
export default function Loading() {
  return (
    <div className="container mx-auto my-6 animate-pulse">
      {/* Container simulating the Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        
        {/* Left Column: Image Skeleton */}
        <div className="col-span-1">
          <div className="aspect-square bg-gray-200 rounded-2xl w-full"></div>
          {/* Thumbnail dots simulation */}
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-100 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-100 rounded-full"></div>
          </div>
        </div>

        {/* Right Column: Content Skeleton */}
        <div className="col-span-2 space-y-6 py-4">
          <div className="space-y-3">
            {/* Brand Name */}
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            {/* Title */}
            <div className="h-10 bg-gray-200 rounded w-3/4"></div>
            {/* Category */}
            <div className="h-4 bg-gray-100 rounded w-32"></div>
          </div>

          {/* Description Paragraph */}
          <div className="space-y-2">
            <div className="h-3 bg-gray-100 rounded w-full"></div>
            <div className="h-3 bg-gray-100 rounded w-full"></div>
            <div className="h-3 bg-gray-100 rounded w-2/3"></div>
          </div>

          {/* Ratings & Price Section */}
          <div className="flex items-center gap-4 py-4">
            <div className="h-6 bg-gray-200 rounded w-32"></div> {/* Stars */}
            <div className="h-6 bg-gray-200 rounded w-20"></div> {/* Price */}
          </div>

          {/* Add to Cart Button Skeleton */}
          <div className="h-14 bg-gray-200 rounded-xl w-full md:w-1/2 mt-4"></div>
        </div>
      </div>
    </div>
  );
}