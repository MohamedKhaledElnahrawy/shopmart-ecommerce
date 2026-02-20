import { BrandItem } from '@/Interfaces/brandInterfaces'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Brand({brand}:{brand:BrandItem}) {
  return (
    <div>
       <Link
              href={`/brands/${brand._id}`}
              className="block"
            >
              <div className="border rounded-lg p-4 flex flex-col items-center hover:shadow-md transition">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  className="w-20 h-20 object-contain mb-2 rounded p-1"
                  width={400}
                  height={400}
                ></Image>

                <p className="text-center font-medium">{brand.name}</p>
              </div>
            </Link>
    </div>
  )
}
