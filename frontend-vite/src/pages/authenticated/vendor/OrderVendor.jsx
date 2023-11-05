
import React, { useEffect, useState } from 'react'
import OrderCard from './components/OrderCard'
import { useGetAllVendorOrderQuery } from '../../../redux/API/orderAPI'

const OrderVendor = () => {
    const [order, SetOrder] = useState("");
    const getAllOrder_vendor = useGetAllVendorOrderQuery(undefined, {
        refetchOnMountOrArgChange: true,

    })

    useEffect(() => {
        if (getAllOrder_vendor.data) {
            SetOrder(getAllOrder_vendor.data);

        }
    }, [getAllOrder_vendor.data, getAllOrder_vendor.isSuccess])

    if (getAllOrder_vendor.isLoading && !getAllOrder_vendor.data) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div className='mt-10 mx-10'>
                {
                    order.orders?.map((val, key) => {
                        return (
                            <div key={key}>
                                <OrderCard ordData={val} allquery={getAllOrder_vendor} />
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default OrderVendor