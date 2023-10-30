

import React from 'react'
import Navbar from '../../components/navbar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const Dashboard = () => {
    return (
        <div>
            <div className=''>
                <Navbar />
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard