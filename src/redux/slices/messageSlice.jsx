import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const messageSlice=createSlice({
    name:"messages",
    initialState:{
        loading:false,
        messages:[],
        error:null,
        message:null
    },
    reducers:{
        getAllMessageRequest(state,action)
        {
            state.loading=true,
            state.messages=[],
            state.error=null
        },
        getAllMessageSuccess(state,action){
            state.loading=false,
            state.messages=action.payload,
            state.error=null 
        },
        getAllMessageFailed(state,action){
            state.loading=true,
            state.messages=state.messages,
            state.error=action.payload 
        },
        deleteMessageRequest(state,action)
        {
            state.loading=true,
            state.message=null,
            state.error=null
        },
        deleteMessageSuccess(state,action){
            state.loading=false,
            state.message=action.payload,
            state.error=null 
        },
        deleteMessageFailed(state,action){
            state.loading=false,
            state.message=null,
            state.error=action.payload
        },
        resetMessageSlice(state,action){
            state.error=null,
            state.loading=false,
            state.messages=state.messages,
            state.message=null
        },
        clearAllErrors(state, action) {
            state.error = null;
            state.messages = state.messages;
          },

    }
})

export const getAllMessages=()=>async(dispatch)=>
{
    dispatch(messageSlice.actions.getAllMessageRequest())
    try{
        const response=await axios.get("https://portfolio-backend-td74.onrender.com/api/v1/message/getall",{withCredentials:true})
        console.log(response)
        dispatch(messageSlice.actions.getAllMessageSuccess(response.data.messages))
        dispatch(messageSlice.actions.clearAllErrors())

    }catch(error)
    {
        dispatch(messageSlice.actions.getAllMessageFailed(error?.response?.data?.message))
    }
}

export const deleteMessage=(id)=>async(dispatch)=>
    {
        dispatch(messageSlice.actions.deleteMessageRequest())
        try{
            const response =await axios.delete(`https://portfolio-backend-td74.onrender.com/api/v1/message/delete/${id}`,{
                withCredentials:true
            })
            console.log(response)
            dispatch(messageSlice.actions.deleteMessageSuccess(response?.data?.message))
            dispatch(messageSlice.actions.clearAllErrors())
    
        }catch(error)
        {
            dispatch(messageSlice.actions.deleteMessageFailed(error?.response?.data?.message))
        }
    }

    export const clearAllMessageErrors = () => (dispatch) => {
        dispatch(messageSlice.actions.clearAllErrors());
      };
      
      export const resetMessagesSlice = () => (dispatch) => {
        dispatch(messageSlice.actions.resetMessageSlice());
      };

export default messageSlice.reducer