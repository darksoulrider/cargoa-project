import React, { useState } from 'react'

const OrderCard = () => {

    const [view, setView] = useState(false);
    const [sch1, setsch1] = useState(null);
    const [sch2, setsch2] = useState(null);
    const [sch3, setsch3] = useState(null);
    return (
        <div>
            <div>
                <div className='bg-slate-200  mx-24 flex items-center justify-between '>
                    <div onClick={() => { setView(!view) }} className='mx-32  h-20 pl-4 hover:cursor-pointer '>
                        <h1 h1 className='text-slate-800 font-bold pt-4' > Order Phone..</h1>
                        <p>crated at - 12/12/2024</p>
                    </div >
                    <div className='mr-16'>
                        <button onClick={() => { setView(!view) }} className='bg-blue-600 px-6 rounded-md hover:bg-blue-800 py-1 text-xl text-white '>view</button>
                    </div>
                </div >
                <hr className='w-12 text-xl h-[0.2rem]' />
            </div>

            {view ?
                <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                    <div class="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full">

                    </div>
                    <div class="bg-white gap-2 flex flex-col pt-12 rounded-lg p-4 h-[40rem] w-[30rem] shadow-lg z-10">

                        <label >Product Name</label>
                        <input disabled={true} type="text" value={"Order Phone.."} />

                        <label >Quantity</label>
                        <input disabled={true} type="text" value={12} />

                        <label >Shipping Day</label>
                        <input disabled={true} type="text" value={"12/1/2024"} />

                        <label >Shipping Schedule 1</label>
                        <input onChange={(e) => { setsch1(e.target.value) }} className='h-12' type="date" value={sch1} />

                        <label >Shipping Schedule 2</label>
                        <input onChange={(e) => { setsch1(e.target.value) }}
                            type="date" value={sch2} />

                        {/* set the ture to variable and then select */}
                        <label >Shipping Schedule 3</label>
                        <input className={`${true ? "bg-green-400" : null}`} onChange={(e) => { setsch3(e.target.value) }}
                            type="date" value={sch3} />
                        <div className='flex justify-center  gap-10'>
                            <button onClick={() => { setView(!view) }} class="mt-4 bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md">Submit</button>
                            <button onClick={() => { setView(!view) }} class="mt-4 bg-slate-700 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded-md">Close</button>
                        </div>
                    </div>
                </div>
                : null
            }


        </div>
    )
}

export default OrderCard