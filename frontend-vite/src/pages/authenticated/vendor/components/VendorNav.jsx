import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
const VendorNav = () => {
    const navigate = useNavigate();
    return (
        <nav className='bg-gray-800 h-16 '>
            <div className='flex  mx-auto max-w-7xl items-center  justify-between '>
                <div className=' flex items-center '>
                    <h1 onClick={() => { navigate("/vendor/dashboard") }} className='cursor-pointer text-white m-3 text-xl font-bold tracking-wide'>Cargoa</h1>
                    <div>
                        <NavLink
                            to={'/vendor/order'}
                            className={`link cursor-pointer text-white ml-10 hover:text-blue-400 font-bold`}
                        > Order
                        </NavLink>
                    </div>
                </div>

                <div className='flex gap-4  '>

                </div>
            </div>
        </nav >
    )
}

export default VendorNav