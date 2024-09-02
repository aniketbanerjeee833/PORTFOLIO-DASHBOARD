import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clearAllTimelineErrors, deleteTimeline, getAllTimeline, resetTimelineSlice } from '../redux/slices/timelineSlice'
import { Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ManageTimeline() {
  const { loading, timeline, error, message } = useSelector((state) => state.timeline)
  console.log(timeline)
  const dispatch = useDispatch()

  const handleDeleteTimeline = (id) => {
    console.log(id)
    dispatch(deleteTimeline(id))
  }
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllTimelineErrors())
    }
    if (message) {
      toast.success(message)
      dispatch(resetTimelineSlice())
      dispatch(getAllTimeline());
    }

  }, [dispatch, loading, error, message])
  return (
    <section className='p-4 border-black border-2'>
      <div className=' border-black border-2'>

        <div className='flex justify-between'>
          <h1 className='text-xl font-semibold'>Manage Your Timeline</h1>
          <div>
            <Link to={"/"}>
              <button
                className="text-white  bg-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-black dark:hover:bg-slate-700 dark:focus:ring-slate-800">

                Return to dashboard</button>
            </Link>
          </div>
        </div>
        <table className=' border-black border-2 w-full'>
          <thead>
            <tr>
              <th> title</th>
              <th className='col-span-3'> Description</th>
              <th>From</th>
              <th>To</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {timeline && timeline.length > 0 ? (
              timeline?.map((element, index) => {
                return (
                  <tr className="px-6 py-4 font-medium text-gray-900 text-center dark:text-white" key={index}>
                    <td>{element?.title}</td>
                    <td className='col-span-3'>{element?.title}</td>
                    <td>{element?.timeline.from}</td>
                    <td>{element?.timeline?.to ? element?.timeline?.to : "Present"}</td>
                    <td className='flex justify-center items-center'>  <button onClick={() => handleDeleteTimeline(element._id)} className='border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600  hover:text-slate-50 hover:bg-red-600'>
                      <Trash2 className="h-5 w-5" />
                    </button>
                    </td>

                  </tr>)
              })) : (
              <>
                <tr>
                  <td>
                    No Timeline
                  </td>
                </tr>
              </>
            )
            }
          </tbody>

        </table>
      </div>
    </section>
  )
}
