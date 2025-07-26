'use client'
import AdminNavBar from '@/components/adminNavbar/AdminNavBar';
import CrudManage from '@/components/crudmanage/CrudManage'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [products, setProducts] = useState([]);
  useEffect(()=>{
  async function fetchData() {
  const res= await fetch("https://api.escuelajs.co/api/v1/products")
  const data =await res.json()
  setProducts(data)
  }
  fetchData()
},[])
  return (
    <div>
        <CrudManage nameofCrud="Product" data={products}/>
    </div>
  )
}

export default page