'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/productCard/productCard';
import CarouselCom from '@/components/CarouselCom';
import { jsx } from 'react/jsx-runtime';

const Page = () => {
  const [categories, setCategories] = useState([]);
  const [addProduct, setAddProduct] = useState(0);

  const handleAddToCartClick = () => {
    setAddProduct(addProduct + 1);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/products");

        if (!response.ok) {
          throw new Error("Server error");
        }

        const data = await response.json();
        setCategories(data.categories); // From backen
      console.log(data.categories)
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 box-border">
  
      <CarouselCom product={categories}/>
      {categories.map((category, index) => (
        <div key={index}>
          <h1 className="text-3xl font-bold my-6 ml-6">{category.main_category.toUpperCase()}</h1>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {category.products.map((product, key) => (
              <ProductCard key={product._id || key} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
