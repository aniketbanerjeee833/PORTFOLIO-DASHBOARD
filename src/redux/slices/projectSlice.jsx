import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice=createSlice({
    name:"project",
    initialState:{
        loading:false,
        project:[],
        error:null,
        message:null,
        singleProject:{}
    },
    reducers:{
        getAllProjectRequest(state,action)
        {
            state.loading=true,
            state.project=[],
            state.error=null
        },
        getAllProjectSuccess(state,action){
            state.loading=false,
            state.project=action.payload,
            state.error=null 
        },
        getAllProjectFailed(state,action){
            state.loading=true,
            state.project=state.project,
            state.error=action.payload 
        },

        deleteProjectRequest(state,action)
        {
            state.loading=true,
            state.message=null,
            state.error=null
        },
        deleteProjectSuccess(state,action){
            state.loading=false,
            state.message=action.payload,
            state.error=null 
        },
        deleteProjectFailed(state,action){
            state.loading=false,
            state.message=null,
            state.error=action.payload
        },

        addNewProjectRequest(state,action)
        {
           state.loading=true,
            state.message=null,
            state.error=null
        },
        addNewProjectSuccess(state,action){
            state.loading=false,
            state.message=action.payload,
            state.error=null 
        },
        addNewProjectFailed(state,action){
            state.loading=false,
            state.message=null,
            state.error=action.payload
        }, 

        updateProjectRequest(state,action)
        {
           state.loading=true,
            state.message=null,
            state.error=null
        },
        updateProjectSuccess(state,action){
            state.loading=false,
            state.message=action.payload,
            state.error=null 
        },
        updateProjectFailed(state,action){
            state.loading=false,
            state.message=null,
            state.error=action.payload
        }, 

        resetProjectSlice(state,action){
            state.error=null,
            state.loading=false,
            state.project=state.project,
            state.message=null
        },
        clearAllErrors(state, action) {
            state.error = null;
            state.project = state.project;
          },

    }
})

export const getAllProjects=()=>async(dispatch)=>
    {
        dispatch(projectSlice.actions.getAllProjectRequest())
        try{
            const response=await axios.get("http://localhost:3000/api/v1/project/getall",{
                withCredentials:true
            })
            dispatch(projectSlice.actions.getAllProjectSuccess(response?.data?.project))
            dispatch(projectSlice.actions.clearAllErrors())
    
        }catch(error)
        {
            dispatch(projectSlice.actions.getAllProjectFailed(error?.response?.data?.message))
        }
    }
    
    export const deleteProject=(id)=>async(dispatch)=>
        {
            dispatch(projectSlice.actions.deleteProjectRequest())
            try{
                const response=await axios.delete(`http://localhost:3000/api/v1/project/delete/${id}`,{
                    withCredentials:true
                })
                dispatch(projectSlice.actions.deleteProjectSuccess(response?.data?.message))
                dispatch(projectSlice.actions.clearAllErrors())
        
            }catch(error)
            {
                dispatch(projectSlice.actions.deleteProjectFailed(error?.response?.data?.message))
            }
        }


        export const addNewProject=(newData)=>async(dispatch)=>
        {

            dispatch(projectSlice.actions.addNewProjectRequest())
            try{

                const response=await axios.post(`http://localhost:3000/api/v1/project/add`,newData,{
                    withCredentials:true,
                    headers: { "Content-Type": "multipart/form-data" },
                })
                dispatch(projectSlice.actions.addNewProjectSuccess(response?.data?.message))
                dispatch(projectSlice.actions.clearAllErrors())
        
            }catch(error)
            {
                dispatch(projectSlice.actions.addNewProjectFailed(error?.response?.data?.message))
            }
        }
    
        export const updateProject=(id,newData)=>async(dispatch)=>
            {
    
                dispatch(projectSlice.actions.updateProjectRequest())
                try{
    
                    const response=await axios.put(`http://localhost:3000/api/v1/project/update/${id}`,newData,{
                        withCredentials:true,
                        headers: { "Content-Type": "application/json" },
                    })
                    console.log(response)
                    dispatch(projectSlice.actions.updateProjectSuccess(response?.data?.message))
                    dispatch(projectSlice.actions.clearAllErrors())
            
                }catch(error)
                {
                    dispatch(projectSlice.actions.updateProjectFailed(error?.response?.data?.message))
                }
            }

        export const clearAllProjectErrors = () => (dispatch) => {
            dispatch(projectSlice.actions.clearAllErrors());
          };
          
          export const resetProjectSlice = () => (dispatch) => {
            dispatch(projectSlice.actions.resetProjectSlice());
          };
export default projectSlice.reducer