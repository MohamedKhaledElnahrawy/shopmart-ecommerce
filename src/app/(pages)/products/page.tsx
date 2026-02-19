import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import {  Star, StarHalf } from "lucide-react";
import Link from "next/link";
import AddToCart from "@/components/AddToCart/AddToCart";
import { getProduct } from "@/actions/product.action";
import { formatCurrency } from "@/utilities/formateCurrency";
import { ProductResponse } from "@/Interfaces/productInterface";
import WishlistHeart from "@/components/wishlistHeart/WishlistHeart";

{
  /* ************************************************************ */
}

export default async function Products() {
  const data: ProductResponse = await getProduct();
  console.log("🚀 ~ Products ~ data:", data);

  if (!data || !data.data.length) {
    return (
      <p className="text-center mt-8">
        Products could not be loaded. Please try again later.
      </p>
    );
  }

  {
    /* ************************************************************ */
  }

  return (
    <div className="max-w-300 mx-auto">
      <div
        className="my-5 grid grid-cols-1 md:grid-cols-3
       lg:grid-cols-4 gap-4"
      >
        {data?.data?.map((product) => (
          <div key={product._id} className=" rounded-lg   ">
            <Card className="overflow-hidden pt-0 ">
              <Link href={`/products/${product._id}`}>
                <div className=" -m-1 -mt-6">
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    width={200}
                    height={150}
                    className="w-full relative z-20 object-cover"
                  />
                </div>
                <CardHeader className="mt-2">
                  <CardDescription>{product.brand.name}</CardDescription>
                  <CardTitle className="line-clamp-1">
                    {product.title}
                  </CardTitle>
                  <CardDescription>{product.category.name}</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-2 items-center">
                  <div className="flex">
                    <Star
                      className="size-4 text-amber-400 fill-amber-400 "
                      fill="true"
                    />
                    <Star
                      className="size-4 text-amber-400 fill-amber-400 "
                      fill="true"
                    />
                    <Star
                      className="size-4 text-amber-400 fill-amber-400 "
                      fill="true"
                    />
                    <Star
                      className="size-4 text-amber-400 fill-amber-400 "
                      fill="true"
                    />
                    <StarHalf
                      className="size-4 text-amber-400 fill-amber-400 "
                      fill="true"
                    />
                  </div>
                  <p>{product.ratingsAverage}</p>
                  <p>{formatCurrency(product.price)} </p>
                </CardContent>
              </Link>
          
              <div className="p-4 pt-0 flex items-center gap-2">

                <div className="grow">
                  <AddToCart productId={product._id} />
                </div>

                <div className="shrink-0  rounded-md transition-colors cursor-pointer">
                  <WishlistHeart productId={product._id} />
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
