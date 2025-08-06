"use client"
import AdminNavBar from '@/components/adminNavbar/AdminNavBar'
import { Button, Input } from '@mui/material'
import React, { useEffect, useState } from 'react'

const page = () => {
  
  const[category,setCategory]=useState([])
  const[value,setValue]=useState('')

  useEffect(()=>{
    
    async function getdata(){ 
    const res = await fetch("http://localhost:8000/products")
    const data=await res.json()
    setCategory(data.mainCategory)
    console.log(data)
  
  let uniqueMaincategories=[]
  let previousItem=[]
 
  data.map((item,key)=>{
     if( previousItem!=item.main_category){
    previousItem=item.main_category
    uniqueMaincategories.push(item.main_category)}
  })
  setMainCategory(uniqueMaincategories)}
  getdata()
  },[])
  const addCategory=(event)=>{
    setValue(event.target.value);
  }
  const handelCLick=()=>{
    if(value &&!maincategory.includes(value)){
    setMainCategory(prev=>[...prev,value])
    setValue('')}
  }
  const generateNewCategory=()=>{
    return maincategory.map((item,key)=>{
      return <li key={key}>{item}</li>
    })
  }
  
  return (
    <>
    <div className='flex  flex-col  gap-10 justify-center items-center'>
      <div className='text-2xl text-blue-600 font-bold mt-2'>Add Categories</div>
      <Input name='category' placeholder='Category name to add' value={value} onChange={addCategory}/>
      <Button onClick={handelCLick}>Add Category</Button>
    </div>
    <div className='m-20'>
      <div className='text-amber-600 text-xl font-bold mt-10'>Categories You Have Now</div>
      <div>{generateNewCategory()}</div></div></>
  )
}

export default page