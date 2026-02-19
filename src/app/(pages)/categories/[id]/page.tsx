
import React from "react";
import SpecificCategory from "@/components/SpecificCategory/SpecificCategory";

export default async function categoryDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  console.log("🚀 ~ page ~ x:", id);


  return (
   <SpecificCategory id={id} />
  );
}


