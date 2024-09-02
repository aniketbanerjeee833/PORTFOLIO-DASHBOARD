import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const softwareApplicationSlice=createSlice({
    name:"softwareApplications",
    initialState:{
        loading:false,
        softwareApplication:[],
        error:null,
        message:null
    },
    reducers:{
        getAllSoftwareApplicationsRequest(state,action)
        {
            state.loading=true,
            state.softwareApplication=[],
            state.error=null
        },
        getAllSoftwareApplicationsSuccess(state,action){
            state.loading=false,
            state.softwareApplication=action.payload,
            state.error=null 
        },
        getAllSoftwareApplicationsFailed(state,action){
            state.loading=true,
            state.softwareApplication=state.softwareApplication,
            state.error=action.payload 
        },

        deleteNewSoftwareApplicationRequest(state,action)
        {
            state.loading=true,
            state.message=null,
            state.error=null
        },
        deleteNewSoftwareApplicationSuccess(state,action){
            state.loading=false,
            state.message=action.payload,
            state.error=null 
        },
        deleteNewSoftwareApplicationFailed(state,action){
            state.loading=false,
            state.message=null,
            state.error=action.payload
        },

        addNewSoftwareApplicationRequest(state,action)
        {
            state.loading=true,
            state.message=null,
            state.error=null
        },
        addNewSoftwareApplicationSuccess(state,action){
            state.loading=false,
            state.message=action.payload,
            state.error=null 
        },
        addNewSoftwareApplicationFailed(state,action){
            state.loading=false,
            state.message=null,
            state.error=action.payload
        },


        resetSoftwareApplicationSlice(state,action){
            state.error=null,
            state.loading=false,
            state.softwareApplication=state.softwareApplication,
            state.message=null
        },
        clearAllErrors(state, action) {
            state.error = null;
            state.skills = state.skills;
          },

    }
})

export const getAllSoftwareApplications=()=>async(dispatch)=>
    {
        dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationsRequest())
        try{
            const response =await axios.get("http://localhost:3000/api/v1/softwareapplication/getall",{
                withCredentials:true
            })
            console.log(response)
            dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationsSuccess(response?.data?.softwareapplications))
            dispatch(softwareApplicationSlice.actions.clearAllErrors())
    
        }catch(error)
        {
            dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationsFailed(error?.response?.data?.message))
        }
    }
    
    export const deleteSoftwareApplication=(id)=>async(dispatch)=>
        {
            dispatch(softwareApplicationSlice.actions.deleteNewSoftwareApplicationRequest())
            try{
                const response=await axios.delete(`http://localhost:3000/api/v1/softwareapplication/delete/${id}`,{
                    withCredentials:true
                })
                dispatch(softwareApplicationSlice.actions.deleteNewSoftwareApplicationSuccess(response?.data.message))
                dispatch(softwareApplicationSlice.actions.clearAllErrors())
        
            }catch(error)
            {
                dispatch(softwareApplicationSlice.actions.deleteNewSoftwareApplicationFailed(error?.response?.data.message))
            }
        }


        export const addNewSoftwareApplication=(newData)=>async(dispatch)=>
        {

            dispatch(softwareApplicationSlice.actions.addNewSoftwareApplicationRequest())
            try{

                const response=await axios.post(`http://localhost:3000/api/v1/softwareapplication/add`,newData,{
                    withCredentials:true,
                    headers: { "Content-Type": "multipart/form-data" },
                })
                console.log(response)
                dispatch(softwareApplicationSlice.actions.addNewSoftwareApplicationSuccess(response?.data?.message))
                dispatch(softwareApplicationSlice.actions.clearAllErrors())
        
            }catch(error)
            {
                dispatch(softwareApplicationSlice.actions.addNewSoftwareApplicationFailed(error?.response?.data?.message))
            }
        }

       
    

        export const clearAllSoftwareApplicationErrors = () => (dispatch) => {
            dispatch(softwareApplicationSlice.actions.clearAllErrors());
          };
          
          export const resetSoftwareApplicationSlice = () => (dispatch) => {
            dispatch(softwareApplicationSlice.actions.resetSoftwareApplicationSlice());
          };

export default softwareApplicationSlice.reducer