import React, { useEffect, useState } from 'react'
import { Menu } from '@headlessui/react';

// ! forms imported UseForm app
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { createOrderYup } from '../../../utils/YupValidation/OrdersYup';
import { useCreateOrderMutation } from '../../../redux/API/orderAPI';
import { useGetAllUserOrderQuery } from '../../../redux/API/orderAPI';
import { useNavigate } from 'react-router-dom';

import { useGetAllVendorQuery } from '../../../redux/API/AuthApi';

const OrderUser = () => {
    const navigate = useNavigate()
    const [isCreate, SetisCreate] = useState(false);
    const [orderData, setOrderData] = useState(null)
    const [viewOrder, setViewOrder] = useState(false)
    const [vendors, setVendors] = useState([]);




    // const vendors = [
    //     "vendor1@gmail.com",
    //     "vendor2@gmail.com",
    //     "vendor3@gmail.com",
    //     "vendor4@gmail.com"
    // ]
    // ********** api call *********
    const [createOrder, { isSuccess, isLoading, isError }] = useCreateOrderMutation();
    // const { data: userOrders, isSuccess: isOrdSuc, isLoading: isOrdLod, isError: isOrdErr } = useGetAllUserOrdersQuery(undefined, {
    //     refetchOnMountOrArgChange: true,
    // })
    let getAllOrders = useGetAllUserOrderQuery(undefined, {
        refetchOnMountOrArgChange: true,
    })
    let getAllVendor = useGetAllVendorQuery(undefined, {
        refetchOnMountOrArgChange: true,
    })

    // ********** UserForm ****************
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(createOrderYup)
    })

    // create form data

    const sendCreateOroder = async (data) => {

        if (errors) {
            console.log(errors)
        }

        const formData = new FormData();
        formData.append('file', data.file[0])

        formData.append('title', data.title)
        formData.append('quantity', data.quantity)
        formData.append('vendor', data.vendor)
        formData.append('date_of_shipping', data.date)


        const req = await createOrder(formData);
        setOrderData(req.data)
        getAllOrders.refetch()


    }

    useEffect(() => {
        if (isError) {
            alert("Order creation failed.")
        }
        if (isSuccess) {
            alert("Successfully created order.")
            SetisCreate(!isCreate);
        }

    }, [isError, isSuccess, isLoading])

    useEffect(() => {
        if (getAllVendor.isSuccess) {
            if (getAllVendor.data) {
                setVendors(getAllVendor.data.vendor)
            }
        }
    }, [getAllVendor.isSuccess, getAllVendor.data])

    if (getAllOrders.isLoading && !getAllOrders.data && !getAllOrders.data) {
        return <div>loading...</div>
    }
    let orderArray = getAllOrders.data.orders;

    return (

        <div className=''>
            <div className='bg-gray-700 h-20 flex justify-end items-center'>

                <div button onClick={() => { SetisCreate(!isCreate) }} className='mr-4 text-white bg-blue-700 px-2 py-1 rounded-md shadow-md hover:bg-blue-800' > Create order</div >

            </div >
            <div className='px-8 pt-4'>
                <h1 className='text-2xl mb-10 font-bold text-slate-700'>Your Orders</h1>
                <div>
                    {
                        orderArray.map((val, key) => {
                            let d = new Date(val.createdAt);
                            const formattedDate = d.toLocaleDateString();
                            return (
                                <div key={key} className='w-full cursor-pointer hover:bg-slate-100 flex shadow-sm py-4 items-center justify-between px-10'>
                                    <div>
                                        <h1 className='uppercase font-semibold'>{val.title}</h1>
                                        <small className='text-slate-700'>{formattedDate}</small>
                                    </div>
                                    <div>
                                        <button onClick={() => { navigate(`/user/order/${val._id}`) }} className='bg-slate-700 px-4 hover:bg-slate-800 py-1 rounded-md text-white shadow-md '>View</button>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>



            {/* POP UP  */}
            {
                isCreate ?
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                        <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full">

                        </div>

                        <form onSubmit={handleSubmit(sendCreateOroder)} className="bg-white gap-2 flex flex-col pt-12 rounded-lg p-4 h-[40rem] w-[30rem] shadow-lg z-10">

                            <p> Product Name</p>
                            <input {...register('title')} disabled={false} type="text" />

                            <p >Quantity</p>
                            <input {...register('quantity')} disabled={false} type="text" />

                            <p >Shipping Day</p>
                            <input className='cursor-pointer' {...register('date')} disabled={false} type="date" />


                            {/*  headles ui  */}
                            <Menu>
                                <Menu.Button className={`w-full my-2 flex flex-col items-start`}>
                                    <input {...register('vendor')} placeholder='Select vendor' className="cursor-pointer" readOnly={true} type="text" />
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
                                                    onClick={() => setValue('vendor', v, {
                                                        shouldValidate: true
                                                    })}
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



                            <label >Upload doc (pdf)</label>
                            <input {...register('file')} disabled={false} type="file" />

                            <div className='flex justify-center  gap-10'>
                                <button type='submit' className="mt-10 bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md">Submit</button>
                                <button onClick={() => { SetisCreate(!isCreate) }} className="mt-10 bg-slate-700 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded-md">Close</button>
                            </div>
                            {errors.title && <p>{errors.title.message}</p>}
                            {errors.vendor && <p>{errors.vendor.message}</p>}
                            {errors.quantity && <p>{errors.quantity.message}</p>}
                            {errors.date && <p>{errors.date.message}</p>}
                        </form>



                    </div> : null
            }
        </div >
    )
}

export default OrderUser;