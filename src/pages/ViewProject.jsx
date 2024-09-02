import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function ViewProject() {

  const { id } = useParams()
  const navigate = useNavigate();
  

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const handleReturnToDashboard = () => {
    navigate("/")
  }

  const getProject = async () => {
    try {


      const response = await axios.get(`https://portfolio-backend-td74.onrender.com/api/v1/project/get/${id}`, {
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

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }
  }
  useEffect(() => {
    getProject();
    
  }, [])
  const descriptionList = description.split(". ");
  const technologiesList = technologies.split(", ");

  return (
    <section className='border-black border-2 p-4'>
      <div className=' flex justify-end mb-2'>

        <button onClick={handleReturnToDashboard}
          className="text-white bg-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-black dark:hover:bg-slate-700 dark:focus:ring-slate-800">Return to Dashboard</button>
      </div>
      <div className="mt-10 flex flex-col gap-5 p-4">
        <div className=' flex flex-col gap-2'>

          <h1 className="text-2xl font-bold mb-4">{title}</h1>
          <img src={projectBanner
            ? projectBanner
            : ""
          }
            alt="projectBanner"
            className="w-auto h-64 border-black border-2"
          />
        </div>
        <div className='flex flex-col'>
          <p className="text-2xl mb-2">Description:</p>

          <ul className='list-disc'>
            {descriptionList.map((element, index) => {
              return (
                <li key={index}>{element}</li>
              )
            })}
          </ul>
        </div>
        <div className='flex flex-col'>
          <p className="text-2xl mb-2">Technologies:</p>

          <ul className='list-disc'>
            {technologiesList.map((element, index) => {
              return (
                <li key={index}>{element}</li>
              )
            })}
          </ul>
        </div>

        <div className='flex flex-col'>
          <p className='text-xl font-semibold'>Stack</p>
          <span>{stack}</span>
        </div>

        <div className='flex flex-col'>
          <p className='text-xl font-semibold'>Deployed</p>
          <span>{deployed}</span>
        </div>

        


        <div className='flex flex-col'>
          <p className='text-xl font-semibold'>GitHub Repository Link</p>
          <Link to={gitRepoLink} target="_blank">
            {gitRepoLink}</Link>
        </div>

        <div className='flex flex-col'>
          <p className='text-xl font-semibold'>Project Link</p>
          <Link to={gitRepoLink} target="_blank">
            {projectLink}
          </Link>
        </div>
      </div>
      
    </section>
  )
}
