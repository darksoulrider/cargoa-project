import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
const UserNav = () => {
    const navigate = useNavigate();
    return (

        <div className='bg-slate-800 w-44 h-screen'>
            <h1 onClick={() => { navigate("/user/dashboard") }} className='cursor-pointer ml-4 text-white m-3 text-xl font-bold tracking-wide'>Cargoa</h1>
            <div className='flex flex-col gap-4 mt-10   '>
                <NavLink
                    to={'/user/order'}
                    className={`link cursor-pointer text-white ml-10 hover:text-blue-400 font-bold`}
                > Order
                </NavLink>
                <NavLink
                    to={'/user/invite'}
                    className={`link cursor-pointer text-white ml-10 hover:text-blue-400 font-bold`}
                > Invite
                </NavLink>
                <NavLink
                    to={'/user/notification'}
                    className={`link cursor-pointer text-white ml-10 hover:text-blue-400 font-bold`}
                > Notification ({0})
                </NavLink>
            </div>
        </div>

    )
}

export default UserNav;