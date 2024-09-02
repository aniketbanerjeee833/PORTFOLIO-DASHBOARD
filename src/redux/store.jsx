import{combineReducers, configureStore} from "@reduxjs/toolkit"
import messageReducer from "./slices/messageSlice"
import projectReducer from "./slices/projectSlice"
import timelineReducer from "./slices/timelineSlice"
import skillReducer from "./slices/skillSlice"
import softwareApplicationReducer from "./slices/softwareApplicationSlice"
import userReducer from "./slices/userSlice"
import forgotResetPasswordReducer from "./slices/forgotResetPasswordSlice"


import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
 } from 'redux-persist'
 import storage from 'redux-persist/lib/storage'

const persistConfig = {
   key: 'root',
   version: 1,
   storage,
 }

const rootReducer = combineReducers({
    user:userReducer,
    forgotPassword:forgotResetPasswordReducer,
    skill: skillReducer,
    project: projectReducer,
    timeline: timelineReducer,
    softwareApplications: softwareApplicationReducer,
    messages: messageReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
   reducer:persistedReducer,
   middleware: (getDefaultMiddleware) =>
   getDefaultMiddleware({
     serializableCheck: {
       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
     },
   }),
});
export default store;

//  export const store=configureStore({

//  reducer:{
//     user:userReducer,
//     forgotPassword:forgotResetPasswordReducer,
//     skill: skillReducer,
//     project: projectReducer,
//     timeline: timelineReducer,
//     softwareApplications: softwareApplicationReducer,
//     messages: messageReducer,
//  }
// })
