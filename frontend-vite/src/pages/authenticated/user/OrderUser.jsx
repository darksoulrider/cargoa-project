import React, { useState } from 'react'
import { Menu } from '@headlessui/react';





const OrderUser = () => {
    const [isCreate, SetisCreate] = useState(false);

    const vendors = [
        "vendor1@gmail.com",
        "vendor2@gmail.com",
        "vendor3@gmail.com",
        "vendor4@gmail.com"
    ]
    return (


        <div>
            <div className='bg-gray-700 w-screen h-20 flex justify-end items-center'>

                <button onClick={() => { SetisCreate(!isCreate) }} className='mr-48 text-white bg-blue-700 px-2 py-1 rounded-md shadow-md hover:bg-blue-800'>Creat order</button>

            </div>
            <div>

            </div>




            {/* POP UP  */}
            {
                isCreate ?
                    <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                        <div class="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full">

                        </div>
                        <div class="bg-white gap-2 flex flex-col pt-12 rounded-lg p-4 h-[40rem] w-[30rem] shadow-lg z-10">

                            <label >Product Name</label>
                            <input disabled={false} type="text" value={"Order Phone.."} />

                            <label >Quantity</label>
                            <input disabled={false} type="text" value={12} />

                            <label >Shipping Day</label>
                            <input disabled={false} type="text" value={"12/1/2024"} />


                            {/*  headles ui  */}
                            <Menu>
                                <Menu.Button className={`w-full my-2 flex flex-col items-start`}>
                                    <input placeholder='Select vendor' className="cursor-pointer" readOnly={true} type="text" />
                                    {/* {errorsPost.jobtype && <small style={{ textTransform: 'capitalize', fontSize: '1.3rem', letterSpacing: '0rem' }} >
                                        {errorsPost.jobtype.message}</small>} */}
                                </Menu.Button>
                                <div className='relative'>
                                    <Menu.Items className={`flex w-64 flex-col gap-3 absolute bg-white border border-slate-200 slate-md`}>
                                        {
                                            vendors.map(v => {
                                                return <Menu.Item
                                                    as={'a'}
                                                    key={v}
                                                    className={`cursor-pointer py-2 px-4 hover:bg-slate-200 `}
                                                >
                                                    {v}
                                                </Menu.Item>
                                            })
                                        }
                                    </Menu.Items>
                                </div>
                            </Menu>
                            {/*  headles ui  */}




                            <div className='flex justify-center  gap-10'>
                                <button onClick={() => { }} class="mt-4 bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md">Submit</button>
                                <button onClick={() => { SetisCreate(!isCreate) }} class="mt-4 bg-slate-700 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded-md">Close</button>
                            </div>
                        </div>
                    </div> : null
            }
        </div>
    )
}

export default OrderUser;