import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearAllUserErrors, getUser, resetProfile, updateProfile } from '../../redux/slices/userSlice';
import { toast } from 'react-toastify';

export default function UpdateProfile() {

const {user,loading, error, isUpdated, message }=useSelector((state)=>state.user)
console.log(user)
const dispatch=useDispatch();

  const [fullName, setFullName] = useState(user&& user.fullName)
  const [email, setEmail] = useState(user&&user.email)
  const [phone, setPhone] = useState(user&&user.phone)
  const [aboutMe, setAboutMe] = useState(user&&user.aboutMe)
  const [linkedInURL, setLinkedInURL] = useState(user&&(user.linkedInURL==="undefined"?"":user.linkedInURL))
  const [githubURL, setGitHubURL] = useState(user&&(user.githubURL==="undefined"?"":user.githubURL))
  const [portfolioURL, setPortfolioURL] = useState(user&&(user.portfolioURL==="undefined"?"":user.portfolioURL))
  const [avatar, setAvatar] = useState(user&&user?.avatar&&user?.avatar?.url)
  const [resume, setResume] = useState(user&&user?.resume&&user?.resume?.url)
  const [avatarPreview, setAvatarPreview] = useState(user&&user?.avatar&&user?.avatar?.url)
  const [resumePreview, setResumePreview] = useState(user&&user?.resume&&user?.resume?.url)

  const avatarHandler=(e)=>{
    const file=e.target.files[0]
    const reader=new FileReader()
    reader.readAsDataURL(file)
    reader.onload=()=>{
      setAvatarPreview(reader.result)
      setAvatar(file)
    }
  



  }
  const resumeHandler=(e)=>{
    const file=e.target.files[0]
    const reader=new FileReader()
    reader.readAsDataURL(file)
    reader.onload=()=>{
      setResumePreview(reader.result)
      setResume(file)
    }

  }

  const handleUpdateProfile=(e)=>
  {
    e.preventDefault()
    const formData=new FormData();
    formData.append("fullName",fullName)
    formData.append("avatar",avatar)
    formData.append("resume",resume)
    formData.append("aboutMe",aboutMe)
    formData.append("email",email)
    formData.append("phone",phone)
    formData.append("portfolioURL",portfolioURL)
    formData.append("githubURL",githubURL)
    formData.append("linkedInURL",linkedInURL)
    dispatch(updateProfile(formData))

    
  }
console.log(fullName)
  console.log(avatarPreview,resumePreview)

  useEffect(()=>
  {
    if(error){
      toast.error(error)
      dispatch(clearAllUserErrors());
    }
    if(isUpdated)
    {
      dispatch(getUser())
      dispatch(resetProfile())
    }
    if(message)
    {
      toast.success(message);
    }

  },[dispatch,loading,error,isUpdated])
  return (
    <div className="w-full h-full">
      <div>
        <div className="grid w-[100%] gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Profile</h1>
            <p>
              Full Profile Preview
            </p>
          </div>
          <div className="grid gap-4">
            <div className="flex items-start  flex-row  gap-5">
              <div className="grid gap-2 w-full ">
                <label>Profile Image</label>
                <img
                  src={avatarPreview}
                  alt="avatar"
                  className="w-full h-72  rounded-2xl border-2 border-black" />
                <div className="relative">
                  <input type="file" onChange={avatarHandler} className="bg-black text-white" />
                </div>
              </div>

              <div className="grid gap-2 w-full  ">
                <label>Resume</label>
                <Link to={ user&& user?.resume && user?.resume?.url} target="_blank">
                  <img
                    src={ resumePreview}
                    alt="resume"
                    className="w-full  h-72  rounded-2xl border-2 border-black"/>

                </Link>
                <div className="relative">
                  <input type="file" onChange={resumeHandler} className="bg-black text-white " />
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <label>Full Name</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="grid gap-2">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="grid gap-2">
              <label>Phone</label>
              <input type="text" value={phone}  onChange={(e) => setPhone(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="grid gap-2">
              <label>About Me</label>
              <textarea value={aboutMe} onChange={(e) => setAboutMe(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            <div className="grid gap-2">
              <label>Portfolio URL</label>
              <input type="text" value={portfolioURL}  onChange={(e) => setPortfolioURL(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="grid gap-2">
              <label>Github URL</label>
              <input type="text" value={githubURL}  onChange={(e) => setGitHubURL(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="grid gap-2">
              <label>LinkedIn URL</label>
              <input type="text" value={linkedInURL}  onChange={(e) => setLinkedInURL(e.target.value)} 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="grid gap-2">
            <button   onClick={(e) => handleUpdateProfile(e)}
                 className="text-white bg-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-black dark:hover:bg-slate-700 dark:focus:ring-slate-800">Update Profile</button>
            </div>
            

          </div>
        </div>
      </div>
    </div>

  );
}
