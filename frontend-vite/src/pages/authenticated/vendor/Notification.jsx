import React from 'react'

const Notification = () => {


    return (
        <div>
            <div className='mx-auto w-full py-2 bg-blue-50 text-2xl'>
                <h1 className='tracking-wider ml-10 font-sans font-semibold'>Notifications</h1>
            </div>
            <div className='mx-auto  w-[80rem]  shadow-sm text-slate-900 font-semibold '>

                <div onClick={() => { }} className='cursor-pointer  rounded-md  px-2 mt-10 py-2 bg-blue-200  hover:bg-blue-300  '>
                    <h1 className='mb-2'>New Order: [ Title phone 1 ] </h1>
                </div>
                <div onClick={() => { }} className='cursor-pointer rounded-md my-2 px-2 py-2 bg-blue-200 hover:bg-blue-300  mb-10'>
                    <h1 className='mb-2'>New Order: [ Title phone 1 ] </h1>
                </div>


                {/* <div className='mr-10'>
                    <button onClick={() => { }} className='bg-slate-800 text-white px-6 rounded-md hover:bg-slate-900 py-1'>View</button>
                </div> */}
            </div>
        </div>
    )
}

export default Notification