'use client'
import React from 'react'
import NavBar from '@/components/navbar/NavBar'
import ProductCard from '@/components/productCard/productCard'
// pages/index.js
import { useEffect, useState } from "react";

 
const page = () => {
  const [products, setProducts] = useState([]);
   const[addProduct,setaddProuct]=useState(0)
  const handelAddtoCartClick=()=>{
  setaddProuct(addProduct+1)
  }
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("https://api.escuelajs.co/api/v1/products");
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);
  return (<>
    <div className="max-w-screen-xl mx-auto px-4 box-border ">
      <h1 className="text-3xl font-bold my-6  ml-6 self-center">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {products.map((product) => (
          <ProductCard  key={product.id} product={product} />
        ))}
      </div>
    </div></>
  )
}

export default page



 