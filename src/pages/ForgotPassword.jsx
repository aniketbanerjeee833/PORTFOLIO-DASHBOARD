import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../redux/slices/forgotResetPasswordSlice'
import { toast } from 'react-toastify'
import { clearAllUserErrors } from '../redux/slices/userSlice'
import { useNavigate,Link } from 'react-router-dom'


export default function ForgotPassword() {

  const[email,setEmail]=useState("")
  const{message,error}=useSelector((state)=>state.forgotPassword)
  const{isAuthenticated}=useSelector((state)=>state.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  console.log(message,error)
  const handleForgotPassword=(e)=>
  {
    e.preventDefault()
    dispatch(forgotPassword(email))
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
    if(message!==null)
    {
      toast.success(message)
    }

  },[dispatch,isAuthenticated,error])

  return (
    <div>
        <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Forgot Password</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email to request for reset password
            </p>
          </div>
    <form className="max-w-sm mx-auto" onSubmit={handleForgotPassword} >
        <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> email</label>
            <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" required />
        </div>
        

        <div className='mb-5 border-2 border-black'>

            <Link to={"/login"} className='underline' >
            <span className='underline-offset-1'>Remember your password</span>
            </Link>
        </div>

        
       
        <button  
      className="text-white bg-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-black dark:hover:bg-slate-700 dark:focus:ring-slate-800">
        Request for Reset password</button>
    </form>
</div>
  )
}
