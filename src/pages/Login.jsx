

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearAllUserErrors, login } from '../redux/slices/userSlice'
import { toast } from 'react-toastify';

export default function Login() {
const dispatch=useDispatch();
const navigate=useNavigate()
const[email,setEmail]=useState("")
const[password,setPassword]=useState("")
const{loading,isAuthenticated,error,message}=useSelector((state)=>state.user)

console.log(loading,isAuthenticated)
const handleLogin=(e)=>
{
e.preventDefault()
dispatch(login(email,password))
}

useEffect(()=>
{
if(error){
    toast.error(error) 
    dispatch(clearAllUserErrors())
}
if(isAuthenticated) {
    navigate("/")
}


},
[dispatch,loading,isAuthenticated,error])

    return (
        <div>
            <form className="max-w-sm mx-auto" onSubmit={handleLogin} >
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> email</label>
                    <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> password</label>
                    <input type="text" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                <div className='mb-5'>

                    <Link to={"/password/forgot"} >
                    <span>Forgot your password</span>
                    </Link>
                </div>
                
               
                <button type="submit" 
                 className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
            </form>
        </div>
    )
}
