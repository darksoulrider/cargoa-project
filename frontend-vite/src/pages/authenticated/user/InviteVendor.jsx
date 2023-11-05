import React, { useEffect, useState } from 'react'
import { useSendInviteMutation } from '../../../redux/API/NotificationAPI'
const InviteVendor = () => {
    const [email, setEmail] = useState('')

    const [invite, { isError, isLoading, isSuccess }] = useSendInviteMutation()


    const sendInvite = async () => {
        const data = {
            email: email
        }
        const res = await invite(data);
    }

    useEffect(() => {
        if (isSuccess) {
            alert('success')
        }
        if (isError) {
            alert('failed')
        }
    }, [isSuccess, isError])

    return (
        <div className='mx-20 mt-10'>
            <div className='w-full font-bold sans-serif mb-8'>
                <div><p className='text-3xl'>Invite Vendor:</p></div>
            </div>
            <div className='flex gap-10'>
                <input value={email} onChange={(e) => { setEmail(e.target.value) }} className="w-72 px-4 py-2" type="email" />
                <button onClick={sendInvite} className='bg-slate-700 hover:bg-slate-800 px-2 py-1 rounded shadow-md text-white'>Send Invitation</button>
            </div>
        </div >
    )
}

export default InviteVendor;