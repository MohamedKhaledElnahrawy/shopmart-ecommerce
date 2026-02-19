import SpecificBrand from "@/components/SpecificBrand/SpecificBrand";
import React from "react";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  console.log("🚀 ~ page ~ x:", id);


  return (
   <SpecificBrand id={id} />
  );
}

