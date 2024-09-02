import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const timelineSlice=createSlice({
    name:"timeline",
    initialState:{
        loading:false,
        timeline:[],
        error:null,
        message:null
    },
    reducers:{
        getAllTimelineRequest(state,action)
        {
            state.loading=true,
            state.timeline=[],
            state.error=null
        },
        getAllTimelineSuccess(state,action){
            state.loading=false,
            state.timeline=action.payload,
            state.error=null 
        },
        getAllTimelineFailed(state,action){
            state.loading=true,
            state.timeline=state.timeline,
            state.error=action.payload 
        },

        deleteTimelineRequest(state,action)
        {
            state.loading=true,
            state.message=null,
            state.error=null
        },
        deleteTimelineSuccess(state,action){
            state.loading=false,
            state.message=action.payload,
            state.error=null 
        },
        deleteTimelineFailed(state,action){
            state.loading=false,
            state.message=null,
            state.error=action.payload
        },


        addNewTimelineRequest(state,action)
        {
            state.loading=true,
            state.message=null,
            state.error=null
        },
        addNewTimelineSuccess(state,action){
            state.loading=false,
            state.message=action.payload,
            state.error=null 
        },
        addNewTimelineFailed(state,action){
            state.loading=false,
            state.message=null,
            state.error=action.payload
        },


        resetTimelineSlice(state,action){
            state.error=null,
            state.loading=false,
            state.timeline=state.timeline,
            state.message=null
        },
        clearAllErrors(state, action) {
            state.error = null;
            state.timeline = state.timeline;
          },

    }
})

export const getAllTimeline=()=>async(dispatch)=>
    {
        dispatch(timelineSlice.actions.getAllTimelineRequest())
        try{
            const response=await axios.get("https://portfolio-backend-td74.onrender.com/api/v1/timeline/getall",{
                withCredentials:true
            })
            dispatch(timelineSlice.actions.getAllTimelineSuccess(response?.data?.timeline))
            dispatch(timelineSlice.actions.clearAllErrors())
    
        }catch(error)
        {
            dispatch(timelineSlice.actions.getAllTimelineFailed(error?.response?.data?.message))
        }
    }
    
    export const deleteTimeline=(id)=>async(dispatch)=>
        {
            dispatch(timelineSlice.actions.deleteTimelineRequest())
            try{
                const response=await axios.delete(`https://portfolio-backend-td74.onrender.com/api/v1/timeline/delete/${id}`,{withCredentials:true})
                console.log(response)
                dispatch(timelineSlice.actions.deleteTimelineSuccess(response?.data?.message))
                dispatch(timelineSlice.actions.clearAllErrors())
        
            }catch(error)
            {
                dispatch(timelineSlice.actions.deleteTimelineFailed(error?.response?.data?.message))
            }
        }


        export const addNewTimeline=(data)=>async(dispatch)=>
        {

            dispatch(timelineSlice.actions.addNewTimelineRequest())
            try{

                const response=await axios.post(`https://portfolio-backend-td74.onrender.com/api/v1/timeline/add`,data,{
                    withCredentials:true,
                    headers: { "Content-Type": "application/json" },
                })
                dispatch(timelineSlice.actions.addNewTimelineSuccess(response?.data?.message))
                dispatch(timelineSlice.actions.clearAllErrors())
        
            }catch(error)
            {
                dispatch(timelineSlice.actions.addNewTimelineFailed(error?.response?.data?.message))
            }
        }
    
        export const clearAllTimelineErrors = () => (dispatch) => {
            dispatch(timelineSlice.actions.clearAllErrors());
          };
          
          export const resetTimelineSlice = () => (dispatch) => {
            dispatch(timelineSlice.actions.resetTimelineSlice());
          };
    
export default timelineSlice.reducer