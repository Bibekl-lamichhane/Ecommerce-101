'use client'
import AdminDrawer from '@/components/adminDrawer/AdminDrawer'
import AdminNavBar from '@/components/adminNavbar/AdminNavBar'
import React from 'react'

const layout = ({children}) => {
   const [open, setOpen] = React.useState(false);

    const adminFeatures = [
   { name: "Manage Users", backgroundUrl: "", linkto: "/admin/manageuser" },
    { name: "Add Products", backgroundUrl: "", linkto: "/admin/addproduct" },
    {
      name: "Manage Product",
      backgroundUrl: "",
      linkto: "/admin/manageproduct",
    },
     { name: "Add Category", backgroundUrl: "", linkto: "/admin/addcategory" },
    { name: "Manage Orders", backgroundUrl: "", linkto: "/admin/manageorder" },
  ];
    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };
  return (
    <>    
    <div>
      <AdminNavBar ClickHandeled={toggleDrawer(true)}/>
      <AdminDrawer  adminFeatures={adminFeatures} openProp={open} onClose={toggleDrawer(false)}/>
    </div>
        {children}
    </>
  )
}

export default layout