import React from 'react'
import VendorNav from './components/VendorNav'
import { Outlet } from 'react-router-dom'
const VendorDashboard = () => {
    return (
        <div>
            <div>
                <VendorNav />
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default VendorDashboard