import React from 'react'

export default function DashSkills({ skills }) {
//console.log(skills)
    return (
        <>
            <div>
                <h1 className='text-xl font-bold'>Skills</h1>
            </div>

            <div className='grid grid-cols-2 border-black border-2'>
                {skills && skills.length > 0 ? (
                    skills.map((element,index) => {
                        return (
                            <div className='flex flex-col gap-2 p-2' key={index}>
                                <p>{element.title}</p>
                                <div className="w-[100%] bg-slate-400 rounded-full h-3.5 dark:bg-gray-700">
                                    <div className="bg-black h-3.5 rounded-full text-xs font-medium text-blue-100 text-center "
                                        style={{ width: `${element.proficiency}%` }}>{element.proficiency}%</div>
                                </div>
                              
                            </div>
                        )
                    })) : (
                    <>
                        <h1>No skills to show</h1>
                    </>
                )
                }
            </div>
        </>
    )
}
