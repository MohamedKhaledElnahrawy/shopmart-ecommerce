
import React from "react";
export default function Loading() {
  return (
    <div className="mt-4 min-h-[80vh] flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="flex items-center justify-center mb-8">
          <div className="₩-12 h-12 bg-black flex items-center justify-center mr-3">
            <span className="text-white font-bold text-2xl p-3">S</span>
          </div>
          <span className="text-3xl font-bold text-black">ShopMart</span>
        </div>
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto"></div>
          <div className="mx-auto w-12 h-12 border-4 border-gray-100 border-b-gray-400 rounded-full animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>
    </div>
  );
}
