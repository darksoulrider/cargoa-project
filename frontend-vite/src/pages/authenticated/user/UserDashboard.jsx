import React from 'react'
import { Outlet } from 'react-router-dom'
import UserNav from './components/UserNav'
const UserDashboard = () => {
    return (
        <div className='flex flex-row'>
            <UserNav />
            <div className='w-full'>
                <Outlet />
            </div>
        </div>
    )
}

export default UserDashboard