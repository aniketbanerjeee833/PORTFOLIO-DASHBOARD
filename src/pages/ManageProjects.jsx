import { Eye, Pencil, Trash2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { clearAllProjectErrors, deleteProject, getAllProjects, resetProjectSlice } from '../redux/slices/projectSlice'

export default function ManageProjects() {
  const { project, loading, error, message } = useSelector((state) => state.project)
  console.log(project)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleReturnToDashboard = () => {
    navigate("/")
  }
  const handleDeleteProject = (id) => {
    dispatch(deleteProject(id))

  }
  useEffect(() => {

    if (error) {
      toast.error(error)
      dispatch(clearAllProjectErrors())
    }
    if (message) {
      toast.success(message)
      dispatch(resetProjectSlice())
      dispatch(getAllProjects())
    }
  }, [dispatch, loading, error, message])
  return (
    <section className='p-4 border-black border-2'>
      <div className=' flex justify-around mb-2'>
        <h1 className='text-xl font-semibold'>Manage Your Projects</h1>
        <button onClick={handleReturnToDashboard}
          className="text-white bg-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-black dark:hover:bg-slate-700 dark:focus:ring-slate-800">Return to Dashboard</button>
      </div>
      <div className=' border-black border-2'>
        <h1 className='text-xl font-semibold'>Manage Your Projects</h1>
        <table className=' border-black border-2 w-full  '>
          <thead>
            <tr>
              <th> Banner</th>
              <th className='col-span-3'> Title</th>
              <th>Stack</th>
              <th>Deployed</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            
            {project&& project.length>0?(project?.map((element,index) => {
              return(
                <tr  className="px-6  text-center  font-medium text-gray-900  dark:text-white" key={index}>
                  <td  className='flex justify-center items-center' >
                    <img src={element?.projectBanner?.url} alt={element?.title} className="w-16 h-16" />
                  </td>
                  <td  className='colSpan={3}'>{element?.title}</td>
                  <td >{element?.stack}</td>
                  <td  >{element?.deployed}</td>
                  <td>
                    <div className='flex flex-row gap-2 justify-center items-center'>
                      <Link to={`/view/project/${element?._id}`} className='border-green-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-green-600  hover:text-slate-50 hover:bg-green-600'>
                        <Eye className="h-5 w-5" />
                      </Link>
                    
                      <Link to={`/update/project/${element?._id}`} className='border-yellow-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-yellow-600  hover:text-slate-50 hover:bg-red-600'>
                        <Pencil className="h-5 w-5" />
                      </Link>

                      <button onClick={() => handleDeleteProject(element._id)} className='border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600  hover:text-slate-50 hover:bg-yellow-600'>
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>

                </tr>)
              })):<>
                <tr className='text-xl'>
                  <td>No projects to show</td>
                  </tr>
              </>}
          </tbody>

        </table>
      </div>
    </section>
  )
}
