import React from 'react'
import { Link } from 'react-router-dom'

export default function DashTimeline({ timeline }) {
    return (
        <>
            <div className='flex justify-around mb-2'>
                <h1 className='text-2xl font-bold'>Timeline</h1>
                <div>
                    <Link to={"manage/timeline"}>
                        <button
                            className="text-white  bg-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-black dark:hover:bg-slate-700 dark:focus:ring-slate-800">

                            Manage Timeine</button>
                    </Link>
                </div>


            </div>
            <table className=' border-2 border-black w-full'>

                <thead>
                    <tr>
                        <th > Title</th>
                        <th > From</th>
                        <th>To</th>

                    </tr>
                </thead>

                <tbody className='border-2 border-slate-400'>
                    {timeline && timeline.length > 0 ? (
                        timeline.map((element, index) => {

                            return (

                                <tr className="px-6  text-center  font-medium text-gray-900  dark:text-white" key={index}>
                                    <td>

                                        {element.title}

                                    </td>
                                    <td >
                                        <span className='text-xl font-semibold'>{element?.timeline?.from}</span>
                                    </td>
                                    <td >
                                       <span className='text-xl font-semibold'>{element.timeline.to?element.timeline.to:"Present"}</span> 
                                    </td>


                                </tr>)
                        })) : (
                        <>
                            <tr>
                                <td>
                                    No timeline to show
                                </td>
                            </tr>
                        </>
                    )}


                </tbody>
            </table>
        </>
    )
}
