import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearAllMessageErrors, deleteMessage, getAllMessages, resetMessagesSlice } from '../../redux/slices/messageSlice'
import { toast } from 'react-toastify'

export default function Messages({setActive}) {

  
  const { loading, messages, error, message } = useSelector((state) => state.messages)

  console.log(messages)

  const navigate=useNavigate();
  const dispatch=useDispatch();

  const handleDelete=(id)=>
  {
    dispatch(deleteMessage(id))
  }

  const handleReturnToDashboard=()=>
  {
    setActive("dashboard")
    navigate("/")
  }
  useEffect(()=>
  {
    if(error){
      toast.error(error)
      dispatch(clearAllMessageErrors())
    }
    if(message){

      toast.success(message);
      dispatch(resetMessagesSlice())
      dispatch(getAllMessages())


    }

  },[dispatch,loading,messages,error,message])
  return (

    <>


      <section className='  min-h-screen w-full   '>
      <div className='flex justify-between pl-4 pr-4'>
      <h1 className="text-3xl font-bold">Message</h1>
      <button  onClick={handleReturnToDashboard}
      
      className="text-white bg-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-black dark:hover:bg-slate-700 dark:focus:ring-slate-800">Return to Dashboard</button>
      </div>


        <div className='grid grid-cols-2  border-black border-2'>

              {messages && messages.length > 0 ? (
                  messages?.map((element) => 
              {
         
              return(
              <div key={element._id}
              className='block  p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
                <div className='border-2 border-black flex flex-row'>
                  <span className='font-bold'>Sender &nbsp; </span>
                  <span>{element.senderName}</span>
                </div>
                <div className='border-2 border-black flex flex-row'>
                  <span className='font-bold'>Subject &nbsp;</span>
                 <p>{element?.message}</p>
                </div>
                <div className='border-2 border-black flex flex-row'>
                  <span className='font-bold'>Email  &nbsp;</span>
                  <span>{element.email}</span>
                </div>

                <div className='border-2 border-black flex justify-end'>
                <button onClick={()=>handleDelete(element._id)}  
                 className="text-white bg-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-black dark:hover:bg-slate-700 dark:focus:ring-slate-800">Delete</button>
                </div>
              </div>)})):(
                  <>
                  <h1>No messages</h1>
                  </>
              )}

          

      </div>
      </section>

    </>
  )
}
