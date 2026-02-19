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
    <div>
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {image.map((imgUrl, index) => (
            <CarouselItem key={index}>
              <Image
                src={imgUrl}
                alt={title}
                width={400}
                height={300}
                className="w-full "
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
