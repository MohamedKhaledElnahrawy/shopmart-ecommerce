"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

export default function Slides({
  image,
  title,
}: {
  image: string[];
  title: string;
}) {
  return (
    <div className="w-full flex justify-center items-center">
      <Carousel
        opts={{
          loop: true,
          align: "center",
        }}
        plugins={[Autoplay({ delay: 2000 })]}
        className="w-full max-w-full overflow-hidden"
      >
        <CarouselContent className="ml-0 flex">
          {image.map((imgUrl, index) => (
            <CarouselItem
              key={index}
              className="pl-0 flex justify-center items-center min-w-full"
            >
              <div className="relative flex justify-center items-center w-full">
                <Image
                  src={imgUrl}
                  alt={title}
                  width={350}
                  height={350}
                  className="rounded-lg object-contain mx-auto"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
