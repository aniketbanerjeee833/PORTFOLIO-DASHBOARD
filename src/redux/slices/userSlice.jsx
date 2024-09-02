import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"
const userSlice=createSlice({
    name:"user",
    initialState:{
        loading:false,
        isAuthenticated:false,
        user:{},
        error:null,
        message:null,
        isUpdated:false
    },
    reducers:{
        loginRequest(state,action)
        {
            state.loading=true,
            state.user=[],
            state.error=null,
            state.isAuthenticated=false

        },
        loginSuccess(state,action){
            state.loading=false,
            state.user=action.payload,
            state.error=null ,
            state.isAuthenticated=true,
            state.message = action.payload;


        },
        loginFailed(state,action){
            state.loading=true,
            state.user={},
            state.error=action.payload ,
            state.isAuthenticated=false
        },


        loadUserRequest(state,action)
        {
            state.loading=true,
            state.user=[],
            state.error=null,
            state.isAuthenticated=false
        },
        loadUserSuccess(state,action){
            state.loading=false,
            state.user=action.payload,
            state.error=null ,
            state.isAuthenticated=true

        },
        loadUserFailed(state,action){
        state.loading=true,
        state.user={},
        state.error=action.payload ,
        state.isAuthenticated=false
        },

        logoutSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
            state.message = action.payload;
          },
          logoutFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = state.isAuthenticated;
            state.user = state.user;
            state.error = action.payload;
          },


        updatePasswordRequest(state,action)
        {
            state.loading=true,
            state.message=null,
            state.isUpdated=false
            state.error=null
        },
        updatePasswordSuccess(state,action){
            state.loading=false,
            state.message=action.payload,
            state.isUpdated=true
            state.error=null 
        },
       updatePasswordFailed(state,action){
            state.loading=false,
            state.message=null,
            state.isUpdated=false
            state.error=action.payload
        },


        updateProfileRequest(state,action)
        {
            state.loading=true,
            state.message=null,
            state.isUpdated=false
            state.error=null
        },
        updateProfileSuccess(state,action){
            state.loading=false,
            state.message=action.payload,
            state.isUpdated=true
            state.error=null 
        },
       updateProfileFailed(state,action){
            state.loading=false,
            state.message=null,
            state.isUpdated=false
            state.error=action.payload
        },

        updateProfileResetAfterUpdate(state,action){
            state.error=null,
          
            state.isUpdated = false;
            state.message=null
        },
        clearAllErrors(state, action) {
            state.error = null;
            state.user = state.user;
          },

    }
})

export const login=(email,password)=>async(dispatch)=>
{
  console.log("hello")
    dispatch(userSlice.actions.loginRequest())
    console.log("hello")
    try{
        const response=await axios.post("https://portfolio-backend-td74.onrender.com/api/v1/user/login",{email,password},   
          { withCredentials: true, headers: { "Content-Type": "application/json" } 
        })
        //console.log(response)
    dispatch(userSlice.actions.loginSuccess(response.data.user))
    //dispatch(userSlice.actions.clearAllErrors())
    }catch(error)
    {
        dispatch(userSlice.actions.loginFailed(error?.response?.data?.message))
    }
}

export const getUser = () => async (dispatch) => {
    dispatch(userSlice.actions.loadUserRequest());
    try {
      const response = await axios.get("https://portfolio-backend-td74.onrender.com/api/v1/user/me", {
        withCredentials: true,
      });
      //console.log(response)
      dispatch(userSlice.actions.loadUserSuccess(response?.data?.user));
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(userSlice.actions.loadUserFailed(error?.response?.data?.message));
    }
  };

export const logout=()=>async(dispatch)=>
    {
        try{
            const response=await axios.get("https://portfolio-backend-td74.onrender.com/api/v1/user/logout",{
                withCredentials:true
            })
            console.log(response)
        dispatch(userSlice.actions.logoutSuccess(response?.data?.message))
        dispatch(userSlice.actions.clearAllErrors())
        }catch(error)
        {
            dispatch(userSlice.actions.logoutFailed(error?.response?.data?.message))
        }
    }

   

    export const updatePassword =(currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
      dispatch(userSlice.actions.updatePasswordRequest());
      try {
        const response = await axios.put(
          "https://portfolio-backend-td74.onrender.com/api/v1/user/update/password",
          { currentPassword, newPassword, confirmNewPassword },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(response)
        dispatch(userSlice.actions.updatePasswordSuccess(response?.data?.message));
        dispatch(userSlice.actions.clearAllErrors());
      } catch (error) {
        dispatch(
          userSlice.actions.updatePasswordFailed(error?.response?.data?.message)
        );
      }
    };
    export const updateProfile = (newData) => async (dispatch) => {
        dispatch(userSlice.actions.updateProfileRequest());
        try {
          const response = await axios.put("https://portfolio-backend-td74.onrender.com/api/v1/user/update/profile",newData,
            {
              withCredentials: true,
              headers: { "Content-Type": "multipart/form-data" },
            });
          dispatch(userSlice.actions.updateProfileSuccess(response?.data?.message));
          dispatch(userSlice.actions.clearAllErrors());
        } catch (error) {
          dispatch(
            userSlice.actions.updateProfileFailed(error?.response?.data?.message)
          );
        }
      };

    export const resetProfile = () => (dispatch) => {
        dispatch(userSlice.actions.updateProfileResetAfterUpdate());
      };
      export const clearAllUserErrors = () => (dispatch) => {
        dispatch(userSlice.actions.clearAllErrors());
      };
export default userSlice.reducer