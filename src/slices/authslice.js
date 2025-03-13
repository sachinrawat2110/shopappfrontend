import { createSlice } from "@reduxjs/toolkit";
const initialState={isLoggedIn:false,pname:'Guest',utype:'',uid:"",uname:""}
const authslice = createSlice({
    name:'authsl',
    initialState,
    reducers:{
        //{ id: result._id, name: result.name, username: result.username, usertype: result.usertype, isActivated: result.isActivated }
        login(state,action)
        {
            state.isLoggedIn=true
            state.pname=action.payload.name
            state.utype=action.payload.usertype
            state.uid=action.payload.id
            state.uname=action.payload.emailid
        },
        logout(state,action)
        {
            state.isLoggedIn=false
            state.pname="Guest"
            state.utype=''
            state.uid=''
        }
    }
})
export const {login,logout} = authslice.actions
export default authslice.reducer