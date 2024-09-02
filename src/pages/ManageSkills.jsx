import { Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearAllSkillsErrors, deleteSkills, getAllSkills, resetSkillSlice, updateSkill } from '../redux/slices/skillSlice'
import { toast } from 'react-toastify'

export default function ManageSkills() {

  const{loading,message,skills,error}=useSelector((state)=>state.skill)
  const[newProficiency,setNewProficiency]=useState(1)
console.log(skills)

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleInputChange=(proficiency)=>
    {
      console.log(proficiency)
      setNewProficiency(proficiency)
    }

  const handleUpdateSkill=(id)=>
  {
    console.log(id)
    dispatch(updateSkill(id,newProficiency))
  }

  const handleDelete=(id)=>
  {
    dispatch(deleteSkills(id))
  }

  const handleReturnToDashboard=()=>
  {
    navigate("/")
  }

 
  console.log(newProficiency)
  useEffect(()=>
    {
      if(error){
        toast.error(error)
        dispatch(clearAllSkillsErrors())
      }
      if(message){
        toast.success(message)
        dispatch(resetSkillSlice())
        dispatch(getAllSkills());
      }
  
    },[dispatch,loading,error,message])
  return (
    <section className=' border-black border-2 p-4'>
      <div className=' flex justify-around mb-2'>
      <h1 className='text-xl font-semibold'>Manage Skills</h1>
      <button  onClick={handleReturnToDashboard}
      className="text-white bg-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-black dark:hover:bg-slate-700 dark:focus:ring-slate-800">Return to Dashboard</button>
      </div>
  
      <div className='grid grid-cols-2 border-black border-2'>
      {skills&& skills.length>0?(skills?.map((element,index)=>
        {
        
          return(
           
          <div className='p-4  flex flex-col gap-2' key={index}>
            <div className='border-black border-2 flex justify-between'>
              <span className='text-xl font-bold'>{element.title}</span>
              <button className='border-black border-2' >
                <Trash2 onClick={()=>handleDelete(element._id)}/>
              </button>
            </div>
            <div className='flex gap-2'>
              <label>Proficiency</label>
              <input type="text" className='border-black border-2' value={newProficiency} 
              onChange={(e) => handleInputChange(e.target.value)}
              onBlur={()=>handleUpdateSkill(element._id)}
              />
              </div>
            </div>
        )})):(<>
        <h1 className='text-xl'>No skills to show </h1>
        </>)
      }
      </div>
    </section>
  )
}
