import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewProject, clearAllProjectErrors, getAllProjects, resetProjectSlice } from '../../redux/slices/projectSlice'
import { toast } from 'react-toastify'
export default function AddProject() {

  const dispatch = useDispatch()
  const { loading, message, error, project } = useSelector((state) => state.project)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [technologies, setTechnologies] = useState("")
  const [gitRepoLink, setGitRepoLink] = useState("")
  const [projectLink, setProjectLink] = useState("")
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectBanner, setProjectBanner] = useState("")
  const [projectBannerPreview, setProjectBannerPreview] = useState("")

  

  const handleProjectBanner = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setProjectBannerPreview(reader.result)
      setProjectBanner(file)
    }
  }
//console.log(projectBanner)
console.log(description)
  const handleAddNewProject = (e) => {

    e.preventDefault()
    const formData = new FormData();
    formData.append("title", title)
    formData.append("description", description)
    formData.append("technologies", technologies)
    formData.append("stack", stack)
    formData.append("deployed", deployed)
    formData.append("gitRepoLink", gitRepoLink)
    formData.append("projectLink", projectLink)
    formData.append("projectBanner", projectBanner)
    dispatch(addNewProject(formData))
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
    
      <div className="w-full h-full">

        <div className="grid w-[100%] gap-6">
          <div >
            <h1 className="text-3xl font-bold">Add Project</h1>

          </div>
          <form onSubmit={handleAddNewProject}
            className="w-[100%] px-5 md:w-[1000px]">

            <div className="grid gap-2">
              <label>Project Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="grid gap-2">
              <label>Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>
            </div>

            <div className="grid gap-2">
              <label>Technologies used in the project</label>
              <textarea type="text" value={technologies} onChange={(e) => setTechnologies(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>
            </div>



            <div className='grid gap-1 mb-4'>
              <p className='text-xl font-semibold'>Stack</p>
              <select onChange={(e) => setStack(e.target.value)}
                className='cursor-pointer bg-white  rounded-lg shadow w-full dark:bg-gray-700'>
                <option hidden="hidden">Select Stack</option>
                <option value="MERN" className='block   px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>MERN</option>
                <option value="MEAN" className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>MEAN</option>
                <option value="MEVN" className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>MEVN</option>
                <option value="NEXT.JS" className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>NEXT.JS</option>
                <option value="REACT.JS" className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>REACT.JS</option>
              </select>
            </div>

            <div className='grid gap-1 mb-4'>
              <p className='text-xl font-semibold'>Deployed</p>
              <select onChange={(e) => setDeployed(e.target.value)}
                className='cursor-pointer bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700'>
                <option hidden="hidden">Is the Project deployed?</option>
                <option value="YES">Yes</option>
                <option value="No">No</option>

              </select>
            </div>

            <div className="grid gap-2">
              <label>Github URL</label>
              <input type="text" value={gitRepoLink} onChange={(e) => setGitRepoLink(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="grid gap-2">
              <label>Project Link</label>
              <input type="text" value={projectLink} onChange={(e) => setProjectLink(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>


            <div className='grid gap-2'>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  {projectBannerPreview ? (
                    <img
                      className="mx-auto h-20 w-20 text-gray-300"

                      src={projectBannerPreview ? `${projectBannerPreview}` : ""}
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
                        onChange={(e)=>handleProjectBanner(e)}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              <div className="grid gap-2">
                <button
                  className="text-white bg-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-black dark:hover:bg-slate-700 dark:focus:ring-slate-800">Add Project</button>
              </div>



            </div>

        </form>
      </div>
        
    </div>
    


  )
}
