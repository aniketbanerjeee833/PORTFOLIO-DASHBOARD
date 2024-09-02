import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { clearAllSoftwareApplicationErrors, deleteSoftwareApplication, getAllSoftwareApplications, resetSoftwareApplicationSlice } from '../../redux/slices/softwareApplicationSlice';
import { toast } from 'react-toastify';

export default function DashSoftware({ softwareApplication ,appLoading,appError,appMessage}) {
const dispatch=useDispatch()
const[appId,setAppId]=useState("")
 const handleDeleteSoftwareApp = (id) => {
 
    setAppId(id)
    dispatch(deleteSoftwareApplication(id));
  };
  useEffect(()=>
{
if(appError){
    toast.error(appError)
    console.log(appError)
    dispatch(clearAllSoftwareApplicationErrors())
}
if(appMessage){
toast.success(appMessage)
setAppId(null)
dispatch(resetSoftwareApplicationSlice())
dispatch(getAllSoftwareApplications())

}
},[dispatch,appMessage,appError])
    console.log(softwareApplication)
    return (

        <>
            <div className='mb-2'>
                <h1 className='text-xl font-bold'>Software Application</h1>
            </div>
            <table className=' border-2 border-black w-full'>

                <thead>
                    <tr>
                        <th > Name</th>
                        <th > Icon</th>
                        <th>Action</th>

                    </tr>
                </thead>

                <tbody className='border-2 border-slate-400'>
                    {softwareApplication && softwareApplication.length > 0 ? (
                        softwareApplication.map((element, index) => {

                            return (

                                <tr className="px-6  text-center  font-medium text-gray-900  dark:text-white" key={index}>
                                    <td>

                                        {element.name}

                                    </td>
                                    <td >
                                        <img src={element?.svg?.url}  className='w-10 h-10'/>
                                    </td>
                                    <td >
                                        <button onClick={()=>handleDeleteSoftwareApp(element._id)}
                                            className="text-white  bg-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-black dark:hover:bg-slate-700 dark:focus:ring-slate-800">
                                            Delete
                                        </button>
                                    </td>


                                </tr>)
                        })) : (
                        <>
                            <tr >
                                <td >
                                    No Software Application
                                </td>
                            </tr>
                        </>
                    )}


                </tbody>
            </table>
        </>

    )
}
