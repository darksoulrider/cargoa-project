import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useGetSingelVendorOrderQuery } from '../../../redux/API/orderAPI';
import { useScheduleOrderMutation } from '../../../redux/API/orderAPI';


const ViewVendorOrder = () => {

    // ********** Use-states **************

    const { id } = useParams();
    const [orderData, setOrderData] = useState("");
    const [isVendorAct, setIsvendorAct] = useState(false);
    const navigate = useNavigate();


    const [schedule_1, setSchedule_1] = useState("")
    const [schedule_2, setSchedule_2] = useState("")
    const [schedule_3, setSchedule_3] = useState("")

    // ************* get file ***************8
    const getFile = async (url) => {
        try {
            window.open(url, '_blank');
        } catch (error) {
            console.log(url);
        }
    }



    // ********** API CALL **********
    const [sending, { isError: isUpdateError, isSuccess: isUpdateSuccess, isLoading: isUpdateLoading }] = useScheduleOrderMutation();

    const singleOrder = useGetSingelVendorOrderQuery(id, {
        refetchOnMountOrArgChange: true,
    });


    const sendSchedules = async (e) => {
        e.preventDefault();
        try {
            const data = {
                shipping_schedule_1: schedule_1,
                shipping_schedule_2: schedule_2,
                shipping_schedule_3: schedule_3,
            }
            console.log(schedule_1)
            console.log(schedule_2)
            console.log(schedule_3)
            const res = await sending({ id, data });

        } catch (error) {

        }


    }

    // ****** Set schedule hook ************
    useEffect(() => {
        if (isUpdateSuccess) {
            alert('success')
            singleOrder.refetch()
        }
        if (isUpdateError) {
            alert('failed')
        }
    }, [isUpdateSuccess, isUpdateError])


    // ********* get order hook **************
    useEffect(() => {
        if (singleOrder.data) {

            setOrderData(singleOrder.data.order)
            let d = singleOrder.data.order
            setSchedule_1(d.shipping_schedule_1)
            setSchedule_2(d.shipping_schedule_2)
            setSchedule_3(d.shipping_schedule_3)

        }
    }, [singleOrder.isSuccess, singleOrder.data])

    if (singleOrder.isLoading && !singleOrder.data) {
        return <div>Loading...</div>
    }


    return (
        <div>
            <div>
                <div className='bg-gray-200 py-4 px-20'>
                    <button onClick={() => { navigate('/vendor/order') }} className='bg-slate-700 px-4 py-1 shadow-md text-white rounded-md
                    font-bold font-sans'> {"<"} back</button>
                </div>
            </div>
            <div className=''>
                <div>
                    <form onSubmit={(e) => { sendSchedules(e) }}>
                        <div className='flex  flex-col justify-center gap-2 '>
                            <div className='mx-auto font-semibold w-[50rem] mt-10'>
                                <p className='mb-1'>Product Name: </p>
                                <input disabled={true} value={orderData?.title} className='cursor-not-allowed opacity-60 rounded-md mx-auto w-[50rem]' type="text" />
                            </div>
                            <div className='mx-auto font-semibold w-[50rem] mt-2'>
                                <p className='mb-1'>Quantity: </p>
                                <input disabled={true} value={orderData?.quantity} className='cursor-not-allowed opacity-60  rounded-md mx-auto w-[50rem]' type="text" />
                            </div>
                            <div className='mx-auto font-semibold w-[50rem] mt-2'>
                                <p className='mb-1'>Date_of_shipping: </p>
                                <input disabled={true} value={orderData?.date_of_shipping} className='cursor-not-allowed opacity-60  rounded-md mx-auto w-[50rem]' type="text" />
                            </div>
                            <div className='mx-auto font-semibold w-[50rem] mt-2'>
                                <div className='flex gap-8'>
                                    <div>
                                        <p className='mb-1'>Schedule 1: </p>
                                        <input
                                            disabled={orderData.vendorAction ? true : false}
                                            value={schedule_1} onChange={(e) => { setSchedule_1(e.target.value) }}
                                            className={`py-2 ${orderData.vendorAction ? 'cursor-not-allowed opacity-70' : ''} px-4`} type={orderData.vendorAction ? 'text' : 'date'} />
                                    </div>
                                    <div>
                                        <p className='mb-1'>Schedule 2: </p>
                                        <input
                                            disabled={orderData.vendorAction ? true : false}
                                            value={schedule_2} onChange={(e) => { setSchedule_2(e.target.value) }}
                                            className={`py-2 ${orderData.vendorAction ? 'cursor-not-allowed opacity-70' : ''} px-4`} type={orderData.vendorAction ? 'text' : 'date'} />
                                    </div>
                                    <div>
                                        <p className='mb-1'>Schedule 3: </p>
                                        <input
                                            disabled={orderData.vendorAction ? true : false}
                                            value={schedule_3} onChange={(e) => { setSchedule_3(e.target.value) }}
                                            className={`py-2 ${orderData.vendorAction ? 'cursor-not-allowed opacity-70' : ''} px-4`} type={orderData.vendorAction ? 'text' : 'date'} />
                                    </div>
                                </div>
                            </div>
                            {
                                orderData.userAction ?
                                    <div className='mx-auto bg-green-700 text-gray-200 p-2 rounded-md font-semibold w-[50rem] mt-4'>
                                        <p>Confirmed Schedule: {orderData.confirmed_schedule}</p>
                                    </div> : null
                            }

                            <div className='mx-auto flex gap-20 justify-center  p-2 rounded-md font-semibold w-[50rem] mt-4'>
                                <button type='submit' disabled={orderData.vendorAction ? true : false} className={`bg-gray-800 hover:bg-slate-900 px-4 py-2 rounded-md shadow-md text-white
                                ${orderData.vendorAction ? 'opacity-20 cursor-not-allowed' : ''}
                                `}>submit</button>
                                <button type='button' onClick={(e) => { getFile(`http://localhost:9002/uploads/${orderData.orderpdf}`) }} className='bg-gray-800 hover:bg-slate-900 px-4 py-2 rounded-md shadow-md text-white'>View Doc</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </div >

    )
}

export default ViewVendorOrder