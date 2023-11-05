import React, { useEffect, useState } from 'react'

import { useScheduleOrderMutation } from '../../../../redux/API/orderAPI';
import { useGetSingelVendorOrderQuery } from '../../../../redux/API/orderAPI';
import { useNavigate } from 'react-router-dom';

const OrderCard = ({ ordData, allquery }) => {
    let orderData = ordData;
    const id = orderData._id;
    const navigate = useNavigate()



    return (
        <div className=''>
            <div>
                <div className='bg-slate-200 hover:bg-slate-300  mx-24 flex items-center justify-between '>
                    <div onClick={() => { navigate(`/vendor/order/${id}`) }} className='mx-32  h-20 pl-4 hover:cursor-pointer '>
                        <h1 h1 className='text-slate-800 font-bold pt-4' >{orderData.title}</h1>
                        <p>crated at - {orderData.createdAt.split('T')[0]}</p>
                    </div >
                    <div className='mr-16'>
                        <button onClick={() => { navigate(`/vendor/order/${id}`) }} className='bg-blue-600 px-6 rounded-md hover:bg-blue-800 py-1 text-xl text-white '>view</button>
                    </div>
                </div >
                <hr className='w-12 text-xl h-[0.2rem]' />
            </div>


        </div >
    )
}

export default OrderCard