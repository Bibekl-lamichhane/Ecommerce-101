'use client'
import ProductCard from '@/components/productCard/productCard'
import React from 'react'
import { useSelector } from 'react-redux'

const page = () => {
const{wishListItems}=useSelector(state=>state.product)
  return (
     <main className="container mx-auto p-8">
          <h1 className="text-3xl font-bold mb-8">Wish Listed Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishListItems.map((product,key) => (
              <ProductCard key={key} product={product} />
            ))}
          </div>
        </main>
  )
}

export default page