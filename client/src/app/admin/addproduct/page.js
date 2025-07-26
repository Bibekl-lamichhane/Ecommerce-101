'use client'
import { Button, FormControlLabel, Input, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import Checkbox from '@mui/material/Checkbox';
 
const page = () => {
   const [category, setCategory] = useState('');
   const [products, setProducts] = useState([]);
     useEffect(()=>{
     async function fetchData() {
     const res= await fetch("https://api.escuelajs.co/api/v1/products")
     const data =await res.json()
     setProducts(data)
     }
     fetchData()
   },[])

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
let previousItem = null;

const generateSelect = () => {
  return products.map((item, index) => {
    if (previousItem !== item.category.name) {
      previousItem = item.category.name;
      return (
        <MenuItem index={item.category.id} value={item.category.name}>
          {item.category.name}
        </MenuItem>
      );
    } else {
      return null;
    }
  });
};
    
  return (
    <div className="flex flex-col  mx-40 gap-12 justify-center items-center">
      <div className="text-2xl text-amber-600 font-bold">
        Add new Products :-
      </div>
      <div>
         <InputLabel id="demo-simple-select-label">Category</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={category}
    label="Category"
    onChange={handleChange}
  >
     {generateSelect()}
  </Select>
      </div>
      <div>
        <Input name="productname" placeholder="Enter new Product Name here" />
      </div>
      <div>
        <Input name="productprice" placeholder="Enter new Product Price here" />
      </div>
      <div>
        <Input name="productdescription" placeholder="Enter new Product Description here" />
      </div>
      <div>
        <Input name="productlabel" placeholder="Enter new Product label here" />
      </div>
      <div>
        <label className="text-xl">Choose a Product Image </label>
        <input id="chooseproductimg" className="text-xl " type="file" name="productimagelink" />
      </div>
      <div>
         <FormControlLabel control={<Checkbox defaultChecked />} label="Need to Be Featured ?" />
      </div>
      <div>
        <Button type="Submit">Add Product</Button>
      </div>
    </div>
  );
};

export default page

