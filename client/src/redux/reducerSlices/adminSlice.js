import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    categoryList:'',
    Features:[
    { name: "Home", backgroundUrl: "", linkto: "/" },
    { name: "Shop Now", backgroundUrl: "", linkto: "/shopnow" },
    {
      name: "Contact Us",
      backgroundUrl: "",
      linkto: "/contactus",
    },
    { name: "About Us", backgroundUrl: "", linkto: "/aboutus" },
    { name: "Wish List", backgroundUrl: "", linkto: "/wishlist" },
  ],
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    addToCategoryList(state){

    }
    
  },
})

export const {  } = adminSlice.actions
export default adminSlice.reducer