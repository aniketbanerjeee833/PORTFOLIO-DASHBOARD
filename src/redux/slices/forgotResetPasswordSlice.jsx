import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const forgotResetPasswordSlice=createSlice({
    name:"forgotPassword",
    initialState:{
        loading:false,
        error:null,
        message:null
    },
    reducers:{
       forgotPasswordRequest(state,action)
        {
            state.loading=true,
            state.message=null,
            state.error=null
        },
        forgotPasswordSuccess(state,action){
            state.loading=false,
            state.message=action.payload,
            state.error=null 
        },
        forgotPasswordFailed(state,action){
            state.loading=true,
            state.message=state.message,
            state.error=action.payload 
        },
        
        resetPasswordRequest(state,action)
        {
            state.loading=true,
            state.message=null,
            state.error=null
        },
        resetPasswordSuccess(state,action){
            state.loading=false,
            state.message=action.payload,
            state.error=null 
        },
        resetPasswordFailed(state,action){
            state.loading=false,
            state.message=null,
            state.error=action.payload
        },
       
        clearAllErrors(state, action) {
            state.error = null;
            state=state
          },

    }
})

export const forgotPassword=(email)=>async(dispatch)=>
    {
        dispatch(forgotResetPasswordSlice.actions.forgotPasswordRequest())
        console.log(email);
        try{
            const response=await axios.post("http://localhost:3000/api/v1/user/password/forgot",{email},
                {withCredentials:true,headers:{"Content-Type":"application/json"}}
            )
            console.log(response)
            dispatch(forgotResetPasswordSlice.actions.forgotPasswordSuccess(response?.data?.message))
        }catch(error)
        {
            dispatch(forgotResetPasswordSlice.actions.forgotPasswordFailed())
        }
    }

    export const resetPassword=(token,password,confirmPassword)=>async(dispatch)=>
        {
            dispatch(forgotResetPasswordSlice.actions.resetPasswordRequest())
            try{
                const response=await axios.put(`http://localhost:3000/api/v1/user/password/reset/${token}`,{password,confirmPassword},
                    {withCredentials:true,headers:{"Content-Type":"application/json"}}
                )
                dispatch(forgotResetPasswordSlice.actions.resetPasswordSuccess(response.data.message))
            }catch(error)
            {
                dispatch(forgotResetPasswordSlice.actions.resetPasswordFailed())
            }
        }

export default forgotResetPasswordSlice.reducer