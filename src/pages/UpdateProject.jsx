import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearAllProjectErrors, getAllProjects, resetProjectSlice, updateProject } from '../redux/slices/projectSlice';
import axios from 'axios';

export default function UpdateProject() {

  const { id } = useParams()
  const navigate = useNavigate();
  const { project,error, message, loading } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
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
  const getProject = async () => {
    try {


      const response = await axios.get(`http://localhost:3000/api/v1/project/get/${id}`, {
        withCredentials: true
      })

      setTitle(response?.data?.project?.title);
      setDescription(response?.data?.project?.description)
      setTechnologies(response?.data?.project?.technologies)
      setStack(response?.data?.project?.stack)
      setDeployed(response?.data?.project?.deployed)
      setGitRepoLink(response?.data?.project?.gitRepoLink)
      setProjectLink(response?.data?.project?.projectLink)
      setProjectBanner(response?.data?.project?.projectBanner && response?.data?.project?.projectBanner?.url)
      setProjectBannerPreview(response?.data?.project?.projectBanner && response?.data?.project?.projectBanner?.url)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }
  }


  const handleReturnToDashboard = () => {
    navigate("/")
  }

  const handleUpdateProject = (e) => {

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
    dispatch(updateProject(id, formData))
  }
  useEffect(() => {
    getProject();
    if (error) {
        toast.error(error)
      dispatch(clearAllProjectErrors())
    }
    if (message) {
      toast.success(message)
      dispatch(resetProjectSlice())
      dispatch(getAllProjects())
    }
  }, [dispatch, message, id])

  return (
    <section className='border-black border-2 p-4'>
      <div className=' flex justify-end mb-2'>

        <button onClick={handleReturnToDashboard}
          className="text-white bg-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-black dark:hover:bg-slate-700 dark:focus:ring-slate-800">Return to Dashboard</button>
      </div>
      <div>
        <form
          onSubmit={handleUpdateProject}
          className="w-[100%] px-5 md:w-[1000px] pb-5 mt-10 flex flex-col gap-5 ">

          <div className=' flex flex-col gap-2'>

            <h1>{title}</h1>
            <img src={projectBannerPreview
              ? projectBannerPreview
              : ""
            }
              alt="projectBanner"
              className="w-full h-auto border-black border-2"
            />
            <div className="relative">
              <input
                type="file"
                onChange={handleProjectBanner}
                className="  w-full bg-black text-white "
              />
            </div>
          </div>
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

          <div className='grid gap-2'>
            <label>Stack</label>
            <select value={stack} onChange={(e) => setStack(e.target.value)}
              className='cursor-pointer bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700'>

              <option value="MERN" className='block   px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>MERN</option>
              <option value="MEAN" className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>MEAN</option>
              <option value="MEVN" className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>MEVN</option>
              <option value="NEXT.JS" className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>NEXT.JS</option>
              <option value="REACT.JS" className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>REACT.JS</option>
            </select>
          </div>


          <div className='grid gap-2'>
            <label>Deployed</label>
            <select value={deployed} onChange={(e) => setDeployed(e.target.value)}
              className='cursor-pointer bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700'>

              <option value="YES">Yes</option>
              <option value="No">No</option>

            </select>
          </div>

          <div className="grid gap-2">
            <label>Github Repository Link</label>
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


          <div className="grid gap-2">
            <button type="submit"
              className="text-white bg-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-black dark:hover:bg-slate-700 dark:focus:ring-slate-800">Update Project</button>
          </div>
        </form>
      </div>

    </section >
  )
}
