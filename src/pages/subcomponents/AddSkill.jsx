import React, { useEffect, useState } from 'react'
import { addNewSkills, clearAllSkillsErrors, getAllSkills, resetSkillSlice } from '../../redux/slices/skillSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export default function AddSkill() {

  const dispatch=useDispatch();

  const{loading,error,skill,message}=useSelector((state)=>state.skill)
  //console.log(skill)
  const[title,setTitle]=useState("")
  const[proficiency,setProficiency]=useState("")
  const[svg,setSvg]=useState("")
  const[svgPreview,setSvgPreview]=useState("")
  
 

    const handleSvg=(e)=>
    {
    
      const file=e.target.files[0]
      const reader=new FileReader()
      reader.readAsDataURL(file)
      reader.onload=()=>{
        setSvgPreview(reader.result)
        setSvg(file)
      }
    }
    const handleAddNewSkill=(e)=>
      {
        e.preventDefault()
        const formData=new FormData();
        formData.append("title",title)
        formData.append("proficiency",proficiency)
        formData.append("svg",svg)
  
     
      
        dispatch(addNewSkills(formData))
      }
    useEffect(()=>
    {

      if(error){
        console.log(error)
        toast.error(error)
        dispatch(clearAllSkillsErrors())
      }
      if(message){
        toast.success(message)
       dispatch(resetSkillSlice())
        dispatch(getAllSkills())
      }
    },[dispatch,error,loading])

  return (
    <div className='w-full h-full'>
      <div className="flex flex-col gap-8">
        <div className='mx-auto'>
          <h1 className="text-3xl font-bold ">ADD A NEW SKILL</h1>
        </div>

        <div>
          <form className="max-w-sm mx-auto" onSubmit={(e)=>handleAddNewSkill(e)} >
            <div className="mb-5">
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Title</label>
              <input type="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder='Title ' required />
            </div>
            <div className="mb-5">
              <label htmlFor="proficiency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Proficiency</label>
              <input type="number" id="proficiency" value={proficiency} onChange={(e) => setProficiency(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>

         
            <p>Skill svg</p>        


            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      {svgPreview ? (
                        <img
                          className="mx-auto h-20 w-20 text-gray-300"
                         
                          src={svgPreview ? `${svgPreview}` : ""}
                        />
                      ) : (
                        <svg
                          className="mx-auto h-12 w-12 text-gray-300"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}

                      <div className="mt-4 flex  text-sm leading-6 text-gray-600 ">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleSvg}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>



            <div>
              <button type="submit"
                className="text-white w-full bg-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-black dark:hover:bg-slate-700 dark:focus:ring-slate-800">Add Skill</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
