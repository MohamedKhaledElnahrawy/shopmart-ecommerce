import { CategoryItem } from '@/Interfaces/categoriesInterfaces'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Category({category}:{category:CategoryItem}) {
  return (
    <div>
       <Link
              href={`/categories/${category._id}`}
              className=""
            >
              <div className="border rounded-lg p-4 flex flex-col items-center hover:shadow-md transition">
                <Image
                  src={category.image}
                  alt={category.name}
                  className="w-20 h-20 object-cover mb-2 rounded"
                  width={400}
                  height={400}
                ></Image>

                <p className="text-center font-medium">{category.name}</p>
              </div>
            </Link>
    </div>
  )
}
