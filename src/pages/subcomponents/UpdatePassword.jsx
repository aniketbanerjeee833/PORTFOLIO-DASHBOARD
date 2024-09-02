import React, { useEffect, useState } from 'react'
import { clearAllUserErrors, getUser, resetProfile, updatePassword } from '../../redux/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export default function UpdatePassword() {

  const dispatch=useDispatch()
  const{isUpdated,message,error,loading}=useSelector((state)=>state.user)
  const[currentPassword,setCurrentPassword]=useState("")
  const[newPassword,setNewPassword]=useState("")
  const[confirmNewPassword,setConfirmNewPassword]=useState("")

  const handleUpdatePassword=()=>
  {

    dispatch(updatePassword(currentPassword,newPassword,confirmNewPassword))

  }
  console.log(isUpdated)
  useEffect(()=>
  {
    if(error){
      toast.error(error)
      dispatch(clearAllUserErrors())
    }
    if(isUpdated){
     
      dispatch(resetProfile())
    }
    if (message) {
      toast.success(message);
    }
  },[dispatch,isUpdated,loading,error])

  return (
    <div className='w-full h-full'>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Update Password</h1>
        <p>
          Update Your Password
        </p>
      </div>
      <div className="max-w-sm mx-auto"  >
                <div className="mb-5">
                    <label htmlFor="currentPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Current Password</label>
                    <input type="textl" id="currentPassword" value={currentPassword} onChange={(e)=>setCurrentPassword(e.target.value)}
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> New Password</label>
                    <input type="text" id="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

              
                <div className="mb-5">
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Confirm New Password</label>
                    <input type="text" id="confirmPassword" value={confirmNewPassword} onChange={(e)=>setConfirmNewPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
               
                <button  onClick={()=>handleUpdatePassword()}
                 className="text-white bg-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-black dark:hover:bg-slate-700 dark:focus:ring-slate-800">Update Password</button>
            </div>
    </div>
  )
}
