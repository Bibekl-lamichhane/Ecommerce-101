'use client'

import toast from "react-hot-toast"

const { createSlice } = require("@reduxjs/toolkit")

const initialState={
    cartItems:[],
    wishListItems:[],
    setWishListColor:'grey'
}

const productSlice=createSlice({
    name:'product',
    initialState,
    reducers:{
        addProductInCart(state,actions){
            state.cartItems.push(actions.payload)
            toast.success('Added to the Cart')
        },
         addProductInWishList(state,actions){
            const product=actions.payload
            const exist=state.wishListItems.find(item=>item.id==product.id)
           
            if(!exist){
                 state.wishListItems.push(actions.payload)
                 toast.success('Added to Wishlist')
            }
            else{
                state.wishListItems= state.wishListItems.filter(item=>item.id!=product.id)
                toast.success('Removed from Wishlist')
                }
            }
           
        }
    }
)
export const { addProductInCart,addProductInWishList } = productSlice.actions
export default productSlice.reducer