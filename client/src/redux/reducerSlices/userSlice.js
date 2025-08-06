'use client'
import { createSlice } from "@reduxjs/toolkit"

const initialState={
    userDetails:{},
    isLoggedIn:false,
    token:''
    
}

const userSlice= createSlice({
    name:'user',
    initialState,
    reducers:{
       setisLoggedIn(state){
        state.isLoggedIn=true
       },
       setisLoggedOut(state){
        localStorage.removeItem('userDetails');
        state.isLoggedIn=false
        state.userDetails={}
        state.token=''
        
       },setUserDetails(state,actions){
        state.token=actions.payload.token
        state.userDetails=actions.payload.user
       }
      
       
    }

})
export const { setisLoggedIn,setisLoggedOut,setUserDetails } = userSlice.actions
export default userSlice.reducer