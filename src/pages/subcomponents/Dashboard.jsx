import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import DashProjects from './DashProjects'
import DashSkills from './DashSkills'
import DashSoftware from './DashSoftware'
import DashTimeline from './DashTimeline'

export default function Dashboard() {

  const { softwareApplication, loading: appLoading, error: appError, message: appMessage } = useSelector((state) => state.softwareApplications)
//console.log(softwareApplication)
  const { user } = useSelector((state) => state.user)
  // console.log(user)

  const { project, loading: projectLoading, error: projectError, message: projectMessage } = useSelector((state) => state.project)
  const { skills, loading: skillLoading, error: skillError, message: skillMessage } = useSelector((state) => state.skill)
  const { timeline, loading: timelineLoading, error: timelineError, message: timelineMessage } = useSelector((state) => state.timeline);


  // console.log(skills)

  return (
    <>
      <section className='border-black border-2 grid grid-cols-5'>
        <div className='border-black border-2 col-span-3 flex flex-col gap-2 p-4 w-full h-auto bg-slate-50'>
          <div>
            <p>{user.aboutMe}</p>
          </div>
          <div>
            <Link to={user.portfolioURL && user.portfolioURL} target='_blank'>
              <button
                className="text-white  bg-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-black dark:hover:bg-slate-700 dark:focus:ring-slate-800">
                Visit Portfolio
              </button>
            </Link>
          </div>
        </div>

        <div className='border-black border-2 col-span-1 flex flex-col gap-2 p-4 bg-slate-50'>
          <h1>Projects Completed</h1>
          <div>
            <span>{project?.length}</span>
          </div>
          <div>
            <Link to={"manage/projects"}>
              <button
                className="text-white  bg-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-black dark:hover:bg-slate-700 dark:focus:ring-slate-800">
                Manage Projects
              </button>
            </Link>
          </div>
        </div>



        <div className='border-black border-2 col-span-1 flex flex-col gap-2 p-4 bg-slate-50'>
          <h1>Skills</h1>
          <div>
            <span>{skills?.length}</span>
          </div>
          <div>
            <Link to={"manage/skills"}>
              <button
                className="text-white  bg-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-black dark:hover:bg-slate-700 dark:focus:ring-slate-800">
                Manage Skills
              </button>
            </Link>
          </div>
        </div>

      </section>

      <section className='border-black border-2'>
        <div className='border-black border-2 flex flex-col gap-2 p-4 w-full h-auto'>
          <DashProjects project={project} />
        </div>
        <div className='border-black border-2 flex flex-col gap-2 p-4 w-full h-auto bg-white'>
          <DashSkills skills={skills} />
        </div>
        <div className='border-black border-2 divide-x-4  grid grid-cols-2 gap-2 p-4 w-full h-auto bg-white'>
          <div className='p-2'>
            <DashSoftware softwareApplication={softwareApplication} appError={appError} appLoading={appLoading} appMessage={appMessage}/>
          </div>

          <div className='p-2'>
            <DashTimeline timeline={timeline} />
          </div>

        </div>

      </section>
    </>
  )
}
