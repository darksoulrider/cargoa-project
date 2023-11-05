import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useGetUserSingleOrderQuery } from '../../../redux/API/orderAPI';
import { useConfirmOrderDateMutation } from '../../../redux/API/orderAPI';

const ViewOrder = () => {


    const { id } = useParams();
    const [schedule, setScheudle] = useState(true);
    const [selected_sc, setSelected_sc] = useState('');
    const [dis_sel, setDis_sel] = useState(false)
    const [data, setData] = useState("");
    const navigate = useNavigate()

    // ************* get file ***************8
    const getFile = async (url) => {
        try {
            window.open(url, '_blank');
        } catch (error) {

            console.log(url);
        }
    }



    // ********** API CALL **********
    const [confirmOrder, { isError: isUpdateError, isSuccess: isUpdateSuccess, isLoading: isUpdateLoading }] = useConfirmOrderDateMutation();

    const singleOrder = useGetUserSingleOrderQuery(id, {
        refetchOnMountOrArgChange: true,
    });


    const sendConfirm = async (e) => {
        e.preventDefault();
        const data = {
            schedule: selected_sc,
        }
        try {
            console.log(schedule)
            const res = await confirmOrder({ id, data });

        } catch (e) {
            alert(e.message)
        }

    }

    useEffect(() => {
        if (isUpdateSuccess) {
            alert('success')
            singleOrder.refetch()
        }
        if (isUpdateError) {
            alert('failed')
        }
    }, [isUpdateSuccess, isUpdateError])

    useEffect(() => {
        if (singleOrder.isSuccess) {

            if (!singleOrder.data.order.vendorAction) {
                setDis_sel(true)
            }
            if (singleOrder.data) {
                setData(singleOrder.data.order);// ! have changed line this from below

            }
        }
    }, [singleOrder.isSuccess, singleOrder.data])

    if (singleOrder.isLoading && !singleOrder.data) {
        return <div>Loading...</div>
    }



    // // const sch = [data.sch]
    // 
    return (
        <div>
            <div>
                <div className='w-full py-5 px-10 bg-blue-100'>
                    <button onClick={() => { navigate('/user/order') }} className='bg-slate-700 px-4 py-1 shadow-md text-white rounded-md
                    font-bold font-sans'> {"<"} back</button>
                </div>
            </div>

            <div >
                <form onSubmit={(e) => { sendConfirm(e) }}>
                    <div className='flex  flex-col justify-center gap-2 '>
                        <div className='mx-auto font-semibold w-[50rem] mt-10'>
                            <p className='mb-1'>Product Name: </p>
                            <input disabled={true} value={data?.title} className='cursor-not-allowed opacity-60 rounded-md mx-auto w-[50rem]' type="text" />
                        </div>
                        <div className='mx-auto font-semibold w-[50rem] mt-2'>
                            <p className='mb-1'>Quantity: </p>
                            <input disabled={true} value={data?.quantity} className='cursor-not-allowed opacity-60  rounded-md mx-auto w-[50rem]' type="text" />
                        </div>
                        <div className='mx-auto font-semibold w-[50rem] mt-2'>
                            <p className='mb-1'>Date_of_shipping: </p>
                            <input disabled={true} value={data?.date_of_shipping} className='cursor-not-allowed opacity-60  rounded-md mx-auto w-[50rem]' type="text" />
                        </div>
                        <div className='mx-auto w-[50rem]'>
                            <div className='flex items-center gap-20'>
                                <div>
                                    <p className='mb-1 font-semibold '>Select Schedule</p>
                                    <select disabled={data.confirmed_schedule ? true : false} className={`${data.confirmed_schedule ? 'p-2 cursor-not-allowed' : 'p-2 cursor-pointer'}`} value={selected_sc} onChange={(e) => { setSelected_sc(e.target.value) }}>
                                        <option value="">{data.confirmed_schedule ? data.confirmed_schedule : <p>Select option</p>} </option>
                                        {
                                            data.vendorAction ?

                                                <>
                                                    <option value={data.shipping_schedule_1}>{data.shipping_schedule_1}</option>
                                                    <option value={data.shipping_schedule_2}>{data.shipping_schedule_2}</option>
                                                    <option value={data.shipping_schedule_3}>{data.shipping_schedule_3}</option>
                                                </>
                                                : (
                                                    <option value=''>No option</option>
                                                )
                                        }

                                    </select>
                                    <p className='mt-2 font-semibold'>{data.confirmed_schedule ? `Confirmed: ${data.confirmed_schedule} ` : `Select date:  ${selected_sc}`}</p>
                                </div>
                                <div>
                                    <button type='button' onClick={() => { getFile(`http://localhost:9002/uploads/${data.orderpdf}`) }} className='text-center text-white px-4 py-1 rounded-sm mt-16 shadow-md bg-slate-700 hover:bg-slate-800'>View document</button>
                                </div>
                            </div>
                            <button type='submit' className='text-center text-white px-4 py-1 rounded-sm mt-16 shadow-md bg-slate-700 hover:bg-slate-800'>Submit</button>
                        </div>


                    </div>
                </form>
            </div >
        </div >
    )
}

export default ViewOrder