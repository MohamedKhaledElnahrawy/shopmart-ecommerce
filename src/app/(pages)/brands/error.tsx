"use client";

import { RotateCcw } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("🚨 PAGE ERROR:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-100 text-center p-6">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Something went wrong!
      </h2>
      <p className="text-gray-500 mb-6">
        {error.message || "Failed to load brands."}
      </p>
      <button
        onClick={() => {
          reset();
          window.location.reload();
        }}
        className="..."
      >
        <RotateCcw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
}
