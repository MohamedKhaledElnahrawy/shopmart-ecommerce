export default function CategoryDetailsSkeleton() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6 animate-pulse">
      <div className="max-w-4xl w-full p-6 bg-white rounded-lg shadow-lg text-center">

        {/* Image */}
        <div className="w-full max-w-sm md:max-w-md aspect-4/5 mx-auto mb-6 rounded-lg bg-gray-200" />

        {/* Title */}
        <div className="h-8 w-48 mx-auto bg-gray-200 rounded mb-4" />

        {/* Info */}
        <div className="space-y-3">
          <div className="h-4 w-60 mx-auto bg-gray-200 rounded" />
          <div className="h-4 w-52 mx-auto bg-gray-200 rounded" />
          <div className="h-4 w-56 mx-auto bg-gray-200 rounded" />
        </div>

      </div>
    </div>
  );
}
