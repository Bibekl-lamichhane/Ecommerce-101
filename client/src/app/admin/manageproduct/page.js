'use client'
import ManageProduct from '@/components/crudmanage/ManageProduct';
import Loading from '@/components/Loading';
import React, { useEffect, useState } from 'react'

const page = () => {
  const [products, setProducts] = useState([]);
  const [loading,isLoading]=useState(true)
  useEffect(()=>{
  async function fetchData() {
  const res= await fetch("http://localhost:8000/products")
  const data =await res.json()
  isLoading(false)
  setProducts(data.products)
  }
  fetchData()
},[])
if(loading)return<Loading/>
  return (
    
    <div>
        <ManageProduct nameofCrud="Products" data={products || []}/>
    </div>
  )
}

export default page