import React, { useState } from 'react'
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate();
    return (
        <nav className='bg-gray-800 h-16 '>
            <div className='flex mx-auto max-w-7xl items-center  justify-between '>
                <div onClick={() => { navigate("/home") }} className='cursor-pointer'>
                    <h1 className='text-white m-3 text-xl font-bold tracking-wide'>Cargoa</h1>
                </div>
                <div className='flex gap-4  '>
                    <button onClick={() => { navigate("/login") }} className='text-white rounded-md hover:bg-gray-500 bg--900 w-[4.4rem] py-1'>Login</button>
                    <button onClick={() => { navigate("/signup") }} className='text-gray-700 hover:text-gray-900 hover:bg-slate-300 rounded-md  bg-slate-100 w-[4.4rem] py-1'>Signup</button>
                </div>
            </div>


        </nav >
    )
}

export default Navbar