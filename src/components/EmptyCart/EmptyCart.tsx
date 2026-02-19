import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

export default function EmptyCart() {
  return (
    <div>
    
      <div className="min-h-[60vh] flex justify-center items-center flex-col">
        
        <h2 className=" text-2x1 mb-3">Your Cart Is Empty</h2>
        <Link href={"/products"} className="">
          
          <Button>Add Items </Button>
        </Link>
      </div>
    </div>
  );
}
