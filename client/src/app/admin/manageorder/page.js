'use client'
import ManageUser from '@/components/crudmanage/ManageUser';
import Loading from '@/components/Loading';
import React, { useEffect, useState } from 'react'

const page = () => {
  const [users, setUsers] = useState([]);
  const [loading,isLoading]=useState(true)
  useEffect(()=>{
  async function fetchData() {
  const res= await fetch("http://localhost:8000/users")
  const data =await res.json()
  isLoading(false)
  setUsers(data)
  }
  fetchData()
},[])
if(loading)return<Loading/>
  return (
    
    <div>
        <ManageUser nameofCrud="Users" data={users}/>
    </div>
  )
}

export default page