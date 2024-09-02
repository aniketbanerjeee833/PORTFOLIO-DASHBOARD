import React from 'react'
import { Link } from 'react-router-dom'

export default function DashProjects({ project }) {
  console.log(project)

  return (
    <>
      <div>
        <h1 className='text-xl font-bold'>Projects</h1>
      </div>
      <table className=' border-2 border-black'>

        <thead>
          <tr>
            <th className='col-span-3'> Title</th>
            <th > Stack</th>
            <th>Deployed</th>
            <th>Update</th>
            <th>Visit</th>
          </tr>
        </thead>

        <tbody className='border-2 border-slate-400'>
          {project && project.length > 0 ? (
            project.map((element,index) => {

              return (

                <tr className="px-6  text-center  font-medium text-gray-900  dark:text-white" key={index}>
                  <td className='col-span-3'>

                    {element.title}

                  </td>
                  <td className='col-span-1'>
                    {element.stack}
                  </td>
                  <td className='col-span-1'>
                    {element.deployed}
                  </td>
                  <td className='col-span-1'>
                    <Link to={`update/project/${element._id}`}>
                      <button
                        className="text-white  bg-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-black dark:hover:bg-slate-700 dark:focus:ring-slate-800">
                        Update
                      </button>
                    </Link>
                  </td>
                  <td className='col-span-1'>
                    <Link to={element?.projectLink}>
                      <button
                        className="text-white  bg-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-black dark:hover:bg-slate-700 dark:focus:ring-slate-800">
                        Project Link
                      </button>
                    </Link>
                  </td>
                </tr>)
            })) : (
            <>
              <tr>
                <td>
                No projects
                </td>
               </tr>
            </>
          )}


        </tbody>
      </table>
    </>
  )
}
