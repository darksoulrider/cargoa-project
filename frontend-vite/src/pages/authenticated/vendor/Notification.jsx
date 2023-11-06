import React from 'react'
import { useGetNotificationQuery } from '../../../redux/API/NotificationAPI'
import { useNavigate } from 'react-router-dom'
const Notification = () => {
    const navigate = useNavigate()

    const res = useGetNotificationQuery(undefined, {
        refetchOnMountOrArgChange: true
    })

    if (res.isLoading && !res.data) {
        return <div>loading...</div>
    }

    return (
        <div>
            <div className='mx-auto w-full py-2 bg-blue-50 text-2xl'>
                <h1 className='tracking-wider ml-10 font-sans font-semibold'>Notifications</h1>
            </div>
            <div className='mx-auto  w-[80rem]  shadow-sm text-slate-900 font-semibold '>

                <div className='pt-10'>
                    {res.data.notification.length != 0 ?
                        res.data.notification.slice().reverse().map((val, key) => {
                            return (
                                <div key={key} onClick={() => { navigate(`/vendor/order/${val.orderid}`) }} className='cursor-pointer mb-2  rounded-md  px-2 py-2 bg-blue-200  hover:bg-blue-300  '>
                                    <h1 className='mb-2'> {val.message} </h1>
                                </div>
                            )
                        }) : <div><h1>No notification available</h1></div>
                    }
                    {/* <div onClick={() => { }} className='cursor-pointer mb-2  rounded-md  px-2 py-2 bg-blue-200  hover:bg-blue-300  '>
                        <h1 className='mb-2'> {res.data?.notification[0].message} </h1>
                    </div>

                    <div onClick={() => { }} className='cursor-pointer  rounded-md  px-2  py-2 bg-blue-200  hover:bg-blue-300  '>
                        <h1 className='mb-2'> {res.data?.notification[0].message} </h1>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Notification