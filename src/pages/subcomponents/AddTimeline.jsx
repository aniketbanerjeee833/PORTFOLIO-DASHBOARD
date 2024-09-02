import React, { useEffect, useState } from 'react'
import { addNewTimeline, clearAllTimelineErrors, getAllTimeline, resetTimelineSlice } from '../../redux/slices/timelineSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export default function AddTimeline() {

  const{loading,error,timeline,message}=useSelector((state)=>state.timeline)
  const dispatch=useDispatch()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")

  const handleAddNewTimeline=(e)=>
  {
    e.preventDefault()
    const formData=new FormData();
    formData.append("title",title)
    formData.append("description",description)
    formData.append("from",from)
    formData.append("to",to)
  
    dispatch(addNewTimeline(formData))
  }

  useEffect(()=>
    {
      if(error){
        toast.error(error)
        dispatch(clearAllTimelineErrors())
      }
      if(message){
        toast.success(message)
        dispatch(resetTimelineSlice())
        dispatch(getAllTimeline())
      }
    },[dispatch,error,message,loading])
  return (
    <div className='w-full h-full'>
      <div className="flex flex-col gap-8">
        <div className='mx-auto'>
          <h1 className="text-3xl font-bold ">ADD A NEW TIMELINE</h1>
        </div>
      
      <div>
        <form className="max-w-sm mx-auto" onSubmit={handleAddNewTimeline} >
          <div className="mb-5">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Title</label>
            <input type="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder='Title 'required />
          </div>
          <div className="mb-5">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Description</label>
            <textarea type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder='description..'></textarea>
          </div>


          <div className="mb-5">
            <label htmlFor="from" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> From</label>
            <input type="text" id="from" value={from} onChange={(e) => setFrom(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder='Starting period..'required />
          </div>

          <div className="mb-5">
            <label htmlFor="to" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> To</label>
            <input type="text" id="to" value={to} onChange={(e) => setTo(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
               placeholder='Ending period.. 'required />
          </div>
          <div>
            <button type="submit" 
              className="text-white w-full bg-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-black dark:hover:bg-slate-700 dark:focus:ring-slate-800">Add Timeline</button>
          </div>
        </form>
      </div>
      </div>
    </div>

  )
}
