import React, { useEffect, useState } from 'react'

import { useScheduleOrderMutation } from '../../../../redux/API/orderAPI';
import { useGetSingelVendorOrderQuery } from '../../../../redux/API/orderAPI';

const OrderCard = ({ ordData, allquery }) => {
    let orderData = ordData;
    const id = orderData._id;
    const [view, setView] = useState(false);
    const [sch1, setsch1] = useState("");
    const [sch2, setsch2] = useState("");
    const [sch3, setsch3] = useState("");

    const [update, setupdate] = useState("")
    const [order, setOrder] = useState("")


    const [schedule, { isError, isSuccess, isLoading }] = useScheduleOrderMutation();
    // ************* get file ***************8
    const getFile = async (url) => {
        try {
            window.open(url, '_blank');
        } catch (error) {

            console.log(url);
        }
    }




    const sendingreq = async (e) => {
        e.preventDefault()
        const data = {
            shipping_schedule_1: sch1,
            shipping_schedule_2: sch2,
            shipping_schedule_3: sch3,
        }
        const m = await schedule({ id: id, data: data });
        setupdate(m.data)
    }


    useEffect(() => {
        if (isSuccess) {
            alert('success')
            if (update) {

                setsch1(orderData.shipping_schedule_1)
                setsch2(orderData.shipping_schedule_2)
                setsch3(orderData.shipping_schedule_3)
            }
            allquery.refetch()
        }
        if (isError) {
            alert('error')
        }

    }, [isSuccess, update, isError, view])






    return (
        <div className=''>
            <div>
                <div className='bg-slate-200 hover:bg-slate-300  mx-24 flex items-center justify-between '>
                    <div onClick={() => { setView(!view) }} className='mx-32  h-20 pl-4 hover:cursor-pointer '>
                        <h1 h1 className='text-slate-800 font-bold pt-4' >{orderData.title}</h1>
                        <p>crated at - 12/12/2024</p>
                    </div >
                    <div className='mr-16'>
                        <button onClick={() => { setView(!view) }} className='bg-blue-600 px-6 rounded-md hover:bg-blue-800 py-1 text-xl text-white '>view</button>
                    </div>
                </div >
                <hr className='w-12 text-xl h-[0.2rem]' />
            </div>

            {view ?
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                    <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full">

                    </div>
                    <form onSubmit={(e) => { sendingreq(e) }} className="bg-white gap-2 flex flex-col pt-12 rounded-lg p-4 h-[40rem] w-[30rem] shadow-lg z-10">

                        <label >Product Name</label>
                        <input className='cursor-not-allowed opacity-50' disabled={true} type="text" value={orderData.title} />

                        <label >Quantity</label>
                        <input className='cursor-not-allowed opacity-50' disabled={true} type="text" value={orderData.quantity} />

                        <label >Shipping Day</label>
                        <input className='cursor-not-allowed opacity-50' disabled={true} type="text" value={orderData.date_of_shipping} />

                        <label >Shipping Schedule 1</label>
                        <input disabled={orderData.vendorAction ? true : false} onChange={(e) => { setsch1(e.target.value) }} className={`h-12 ${orderData.vendorAction ? 'cursor-not-allowed opacity-50' : false}`} type="date" value={orderData.vendorAction ? orderData.shipping_schedule_1 : sch1} />

                        <label >Shipping Schedule 2</label>
                        <input disabled={orderData.vendorAction ? true : false} className={`h-12 ${orderData.vendorAction ? 'cursor-not-allowed opacity-50' : false}`} onChange={(e) => { setsch2(e.target.value) }}
                            type="date" value={orderData.vendorAction ? orderData.shipping_schedule_2 : sch2} />


                        <lable label > Shipping Schedule 3</lable>

                        <input disabled={orderData.vendorAction ? true : false} className={`h-12 ${orderData.vendorAction ? 'cursor-not-allowed opacity-50' : false}
                        ${orderData.confirmed_schedule ? 'bg-green-500' : ''}
                        `}
                            onChange={(e) => { setsch3(e.target.value) }}
                            type="date" value={orderData.vendorAction ? orderData.shipping_schedule_1 : sch1} />

                        <div className='flex justify-center  gap-10'>
                            <button type='submit' className="mt-4 bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md">Submit</button>
                            <button onClick={() => { setView(!view) }} className="mt-4 bg-slate-700 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded-md">Close</button>
                            <button onClick={() => { getFile(`http://localhost:9002/uploads/${orderData.orderpdf}`) }} className="mt-4 bg-slate-700 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded-md">view doc</button>
                        </div>
                    </form>
                </div>
                : null
            }


        </div >
    )
}

export default OrderCard