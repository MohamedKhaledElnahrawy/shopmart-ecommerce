'use client'

// app/not-found.tsx
import Link from "next/link";
import { Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full text-center">

{/* **************************************************** */}

        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
          <AlertCircle className="w-10 h-10 text-red-600" />
        </div>

{/* **************************************************** */}

        <h1 className="text-6xl font-black text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-500 mb-10 leading-relaxed">
          Sorry, we could not find the page you are looking for. It might have been moved or deleted.
        </p>

{/* **************************************************** */}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all active:scale-95 shadow-lg"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-all active:scale-95"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}