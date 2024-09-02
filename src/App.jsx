

import {BrowserRouter,Routes,Route} from "react-router-dom"
import React, { useEffect } from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ManageSkills from "./pages/ManageSkills";
import ManageTimeline from "./pages/ManageTimeline";
import ManageProjects from "./pages/ManageProjects";
import ViewProject from "./pages/ViewProject";
import UpdateProject from "./pages/UpdateProject";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { getUser } from "./redux/slices/userSlice";
import { getAllMessages } from "./redux/slices/messageSlice";
import { getAllTimeline } from "./redux/slices/timelineSlice";
import { getAllProjects } from "./redux/slices/projectSlice";
import {  getAllSoftwareApplications } from "./redux/slices/softwareApplicationSlice";
import { useDispatch } from "react-redux";
import { getAllSkills } from "./redux/slices/skillSlice";
export default function App() {
const dispatch=useDispatch()
  useEffect(()=>
  {
    dispatch(getUser());
    dispatch(getAllMessages());
    dispatch(getAllTimeline());
    dispatch(getAllProjects());
    dispatch(getAllSkills())
    dispatch(getAllSoftwareApplications())
  },[])
  return (
     <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/password/forgot" element={<ForgotPassword/>} />
      <Route path="/password/reset/:token" element={<ResetPassword/>} />
      <Route path="/manage/skills" element={<ManageSkills/>} />
      <Route path="/manage/timeline" element={<ManageTimeline/>} />
      <Route path="/manage/projects" element={<ManageProjects/>} />
      <Route path="/view/project/:id" element={<ViewProject/>} />
      <Route path="/update/project/:id" element={<UpdateProject/>} />
    </Routes>
    <ToastContainer position="bottom-right" theme="dark" />
  </BrowserRouter>
 );
 }
  





