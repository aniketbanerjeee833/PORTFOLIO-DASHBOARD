import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const skillSlice=createSlice({
    name:"skill",
    initialState:{
        loading:false,
        skills:[],
        error:null,
        message:null
    },
    reducers:{
        getAllSkillsRequest(state,action)
        {
            state.loading=true,
            state.skills=[],
            state.error=null
        },
        getAllSkillsSuccess(state,action){
            state.loading=false,
            state.skills=action.payload,
            state.error=null 
        },
        getAllSkillsFailed(state,action){
            state.loading=true,
            state.skills=state.skills,
            state.error=action.payload 
        },



        deleteSkillsRequest(state,action)
        {
            state.loading=true,
            state.message=null,
            state.error=null
        },
        deleteSkillsSuccess(state,action){
            state.loading=false,
            state.message=action.payload,
            state.error=null 
        },
        deleteSkillsFailed(state,action){
            state.loading=false,
            state.message=null,
            state.error=action.payload
        },


        addNewSkillRequest(state,action)
        {
            state.loading=true,
            state.message=null,
            state.error=null
        },
        addNewSkillSuccess(state,action){
            state.loading=false,
            state.message=action.payload,
            state.error=null 
        },
        addNewSkillFailed(state,action){
            state.loading=false,
            state.message=null,
            state.error=action.payload
        },

        updateSkillRequest(state,action)
        {
           state.loading=true,
            state.message=null,
            state.error=null
        },
        updateSkillSuccess(state,action){
            state.loading=false,
            state.message=action.payload,
            state.error=null 
        },
        updateSkillFailed(state,action){
            state.loading=false,
            state.message=null,
            state.error=action.payload
        }, 


        resetSkillSlice(state,action){
            state.error=null,
            state.loading=false,
            state.skills=state.skills,
            state.message=null
        },
        clearAllErrors(state, action) {
            state.error = null;
            state.skills = state.skills;
          },

    }
})


export const getAllSkills=()=>async(dispatch)=>
    {
        dispatch(skillSlice.actions.getAllSkillsRequest())
        try{
            const response=await axios.get("https://portfolio-backend-td74.onrender.com/api/v1/skill/getall",{
                withCredentials:true
            })
            dispatch(skillSlice.actions.getAllSkillsSuccess(response?.data?.skill))
            dispatch(skillSlice.actions.clearAllErrors())
    
        }catch(error)
        {
            dispatch(skillSlice.actions.getAllSkillsFailed(error?.response?.data?.message))
        }
    }
    
    export const deleteSkills=(id)=>async(dispatch)=>
        {
            dispatch(skillSlice.actions.deleteSkillsRequest())
            try{
                const response=await axios.delete(`https://portfolio-backend-td74.onrender.com/api/v1/skill/delete/${id}`,{
                    withCredentials:true
                })
                dispatch(skillSlice.actions.deleteSkillsSuccess(response?.data?.message))
                dispatch(skillSlice.actions.clearAllErrors())
        
            }catch(error)
            {
                dispatch(skillSlice.actions.deleteSkillsFailed(error?.response?.data?.message))
            }
        }


        export const addNewSkills=(newData)=>async(dispatch)=>
        {

            dispatch(skillSlice.actions.addNewSkillRequest())
            try{

                const response=await axios.post(`https://portfolio-backend-td74.onrender.com/api/v1/skill/add`,newData,{
                    withCredentials:true,
                    headers: { "Content-Type": "multipart/form-data" },
                })
                console.log(response)
                dispatch(skillSlice.actions.addNewSkillSuccess(response?.data?.message))
                dispatch(skillSlice.actions.clearAllErrors())
        
            }catch(error)
            {
                dispatch(skillSlice.actions.addNewSkillFailed(error?.response?.data?.message))
            }
        }

        
        export const updateSkill=(id,proficiency)=>async(dispatch)=>
            {
    
                dispatch(skillSlice.actions.updateSkillRequest())
                try{
    
                    const response=await axios.put(`https://portfolio-backend-td74.onrender.com/api/v1/skill/update/${id}`,    { proficiency },{
                        withCredentials:true,
                        headers: { "Content-Type": "application/json" },
                    })
                    dispatch(skillSlice.actions.updateSkillSuccess(response?.data?.message))
                    dispatch(skillSlice.actions.clearAllErrors())
            
                }catch(error)
                {
                    dispatch(skillSlice.actions.updateSkillFailed(error?.response?.data?.message))
                }
            }
    

        export const clearAllSkillsErrors = () => (dispatch) => {
            dispatch(skillSlice.actions.clearAllErrors());
          };
          
          export const resetSkillSlice = () => (dispatch) => {
            dispatch(skillSlice.actions.resetSkillSlice());
          };

export default skillSlice.reducer