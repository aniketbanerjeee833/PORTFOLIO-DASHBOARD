import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
export default function Profile() {
  
  const {user}=useSelector((state)=>state.user)
  console.log(user)
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
                    src={user && user?.avatar && user?.avatar?.url}
                    alt="avatar"
                    className="w-full h-auto  rounded-2xl border-2 border-black"
                  />
                </div>
                <div className="grid gap-2 w-full  ">
                  <label>Resume</label>
                  <Link to={user && user?.resume && user?.resume.url} target="_blank">
                    <img
                      src={user && user?.resume && user?.resume.url}
                      alt="resume"
                      className="w-full  h-auto  rounded-2xl border-2 border-black"
                    />
                  </Link>
                </div>
              </div>
              <div className="grid gap-2">
                <label>Full Name</label>
                <input type="text" value={user?.fullName} disabled />
              </div>
              <div className="grid gap-2">
                <label>Email</label>
                <input type="email" value={user?.email} disabled />
              </div>
              <div className="grid gap-2">
                <label>Phone</label>
                <input type="text" value={user?.phone} disabled />
              </div>
              <div className="grid gap-2">
                <label>About Me</label>
                <textarea value={user?.aboutMe} disabled />
              </div>
              <div className="grid gap-2">
                <label>Portfolio URL</label>
                <input type="text" value={user?.portfolioURL} disabled />
              </div>
              <div className="grid gap-2">
                <label>Github URL</label>
                <input type="text" value={user?.githubURL} disabled />
              </div>
              <div className="grid gap-2">
                <label>LinkedIn URL</label>
                <input type="text" value={user?.linkedInURL} disabled />
              </div>
            
             
            </div>
          </div>
        </div>
      </div>
    
  );
};


  

