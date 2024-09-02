import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../redux/slices/forgotResetPasswordSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getUser } from '../redux/slices/userSlice'

export default function ResetPassword() {

  const[password,setPassword]=useState("")
  const[confirmPassword,setConfirmPassword]=useState("")
  const{loading,error,message}=useSelector((state)=>state.forgotPassword)
  const{isAuthenticated}=useSelector((state)=>state.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const{token}=useParams()

  const handleResetPassword=(password,confirmPassword)=>
  {
   
    dispatch(resetPassword(token,password,confirmPassword))
  }

  useEffect(()=>
    {
  
      if(error){
        toast.error(error)
        dispatch(clearAllUserErrors())
      }
      if(isAuthenticated)
      {
        navigate("/")
      }
      if (message !== null) {
        toast.success(message);
        dispatch(getUser());
      }
  
    },[dispatch,isAuthenticated,error,loading])

  return (
    <div>
    <div className="max-w-sm mx-auto" >
        <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> password</label>
            <input type="text" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" required />
        </div>
        <div className="mb-5">
            <label htmlFor="confirm password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> confirm password</label>
            <input type="text" id="confirm password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>

      
        
       
        <button onClick={() => handleResetPassword(password, confirmPassword)}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Reset Password</button>
    </div>
</div>
  )
}
