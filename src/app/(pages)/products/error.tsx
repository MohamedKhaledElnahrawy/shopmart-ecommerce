"use client";

import { useEffect } from "react";
import { ShoppingBag, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("🚨 Product Page Error:", error);
  }, [error]);

  {/* ************************************************************ */}

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center bg-white p-10 rounded-3xl shadow-xl border border-gray-50">
        {/* Icon Section */}
        <div className="relative inline-flex mb-6">
          <div className="absolute inset-0 bg-orange-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="relative bg-orange-50 p-5 rounded-full">
            <ShoppingBag className="w-12 h-12 text-orange-600" />
          </div>
        </div>

{/* ************************************************************ */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Could not Load Products
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          {error.message || "We're having trouble showing our products right now. This is usually temporary."}
        </p>


{/* ************************************************************ */}

        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              reset();
              window.location.reload();
            }}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-all active:scale-95 shadow-lg shadow-orange-100"
          >
            <RotateCcw className="w-5 h-5" />
            Try Refreshing
          </button>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-50 text-gray-700 font-bold rounded-2xl hover:bg-gray-100 transition-all"
          >
            <Home className="w-5 h-5" />
            Return Home
          </Link>
        </div>

        <p className="mt-6 text-xs text-gray-400 font-medium tracking-wide uppercase">
          Error Code: {error.digest || "FETCH_ERROR"}
        </p>
      </div>
    </div>
  );
}