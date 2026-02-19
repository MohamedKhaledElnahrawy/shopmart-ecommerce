

import AddToCart from "@/components/AddToCart/AddToCart";
import Slides from "@/components/Slides/Slides";
import {
  Card,
  CardAction,
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
    { next: { revalidate: 60 }},
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to load product details");
  }

  const { data: product }: { data: Product } = await response.json();

  
  const currentId = product._id; 

  return (
    <div className="container mx-auto my-6">
      <Card className="grid grid-cols-1 md:grid-cols-3 items-center">
        {product.images && (
          <div className="">
            <Slides image={product.images} title={product.title} />
          </div>
        )}

        <div className="col-span-2 space-y-5 p-4">
          <CardHeader className="mt-2">
            <CardDescription>{product.brand.name}</CardDescription>
            <CardTitle>{product.title}</CardTitle>
            <CardAction>{product.category.name}</CardAction>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2 items-center">
            <div className="flex">
              {/* تكرار النجوم */}
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="size-4 text-amber-400 fill-amber-400" />
              ))}
              <StarHalf className="size-4 text-amber-400 fill-amber-400" />
            </div>
            <p>{product.ratingsAverage}</p>
            <p>{formatCurrency(product.price)}</p>
          </CardContent>

          <div className="flex items-center gap-3 p-4">
            <div className="grow">
              <AddToCart productId={currentId} />
            </div>
            
            <div className=" hover:bg-red-50 hover:border-red-200 transition-all rounded-full p-1 shadow-sm">
              <WishlistHeart productId={currentId} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}























