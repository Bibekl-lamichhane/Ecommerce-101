'userclient'
import { createSlice } from "@reduxjs/toolkit"

const initialState={
    userName:'',
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
        state.isLoggedIn=false
        
       }
      
       
    }

})
export const { setisLoggedIn,setisLoggedOut } = userSlice.actions
export default userSlice.reducer