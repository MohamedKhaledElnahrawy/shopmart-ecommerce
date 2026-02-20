import AddToCart from "@/components/AddToCart/AddToCart";
import Slides from "@/components/Slides/Slides";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WishlistHeart from "@/components/wishlistHeart/WishlistHeart";
import { Product } from "@/Interfaces/productInterface";
import { formatCurrency } from "@/utilities/formateCurrency";
import { Star, StarHalf } from "lucide-react";
import { Params } from "next/dist/server/request/params";
import { notFound } from "next/navigation";
import React from "react";
export default async function ProductDetails({
  params,
}: {
  params: Promise<Params>;
}) {
  const { productId } = await params;

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${productId}`,
    { next: { revalidate: 60 } },
  );

  if (response.status === 404) notFound();
  if (!response.ok) throw new Error("Failed to load product details");

  const { data: product }: { data: Product } = await response.json();
  const currentId = product._id;

  return (
    <div className="container mx-auto my-6 px-4">
      <Card className="grid grid-cols-1  md:grid-cols-3 items-center overflow-hidden">
        {product.images && (
          <div className="w-full flex justify-center items-center ps-6 md:ps-0">
            <div className="w-full ">
              <Slides image={product.images} title={product.title} />
            </div>
          </div>
        )}

        <div className="col-span-2 space-y-2 md:space-y-5 p-2 md:p-6">
          <CardHeader className="p-4 text-center md:text-left">
            <CardDescription className="text-sm font-medium text-green-600">
              {product.brand.name}
            </CardDescription>
            <CardTitle className="text-xl md:text-3xl font-bold">
              {product.title}
            </CardTitle>
            <div className="text-sm text-muted-foreground mt-1">
              {product.category.name}
            </div>
            <CardDescription className="mt-4 leading-relaxed">
              {product.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4 justify-center md:justify-start items-center p-4">
            <div className="flex items-center">
              {[...Array(4)].map((_, i) => (
                <Star
                  key={i}
                  className="size-4 text-amber-400 fill-amber-400"
                />
              ))}
              <StarHalf className="size-4 text-amber-400 fill-amber-400" />
              <span className="ml-2 text-sm font-semibold">
                {product.ratingsAverage}
              </span>
            </div>
            <p className="text-2xl font-bold text-green-700">
              {formatCurrency(product.price)}
            </p>
          </CardContent>
          <div className="flex items-center gap-3 p-4 border-t md:border-none">
            <div className="grow">
              <AddToCart productId={currentId} />
            </div>

            <div className="hover:bg-red-50 hover:border-red-200 border border-transparent transition-all rounded-full p-2 shadow-sm">
              <WishlistHeart productId={currentId} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
