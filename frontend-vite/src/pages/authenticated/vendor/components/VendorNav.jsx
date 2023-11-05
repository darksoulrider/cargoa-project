import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
const VendorNav = () => {
    const navigate = useNavigate();
    const logout = async () => {
        await localStorage.clear()
        navigate('/home')
    }



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
                        <NavLink
                            to={'/vendor/notification'}
                            className={`link cursor-pointer text-white ml-10 hover:text-blue-400 font-bold`}
                        > Notificatin ({`0`})
                        </NavLink>
                    </div>
                </div>

                <div onClick={() => { logout() }} className='flex gap-4 bg-red-700 text-white px-4 rounded-md shadow-md font-semibold py-1 '>
                    <button>Logout</button>
                </div>
            </div>
        </nav >
    )
}

export default VendorNav