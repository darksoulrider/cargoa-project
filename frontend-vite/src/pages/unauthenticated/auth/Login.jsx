import React, { useEffect, useState } from 'react'

import { useLoginMutation } from '../../../redux/API/AuthApi'
import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"


import { LoginYup } from '../../../utils/YupValidation/AuthYup';

const Login = () => {
    const navigate = useNavigate();
    const [userLog, setuserLog] = useState("");
    const [logincall, { isError, isLoading, isSuccess }] = useLoginMutation();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(LoginYup)
    });

    const loginReq = async (data) => {

        const user = await logincall({
            email: data.email,
            password: data.password
        })
        setuserLog(user.data)
    }


    useEffect(() => {
        if (isSuccess) {
            console.log("Login successfull..")
        }
        if (userLog) {
            console.log(userLog)
            localStorage.setItem('token', userLog.token)
            localStorage.setItem('usertype', 'user')

            navigate("/user/dashboard")
        }


    }, [isError, isSuccess, userLog])






    return (
        <div className='flex justify-center items-center'>
            <div className='flex rounded-md w-[30rem] h-[30rem] mt-10 bg-gray-200 flex-col pt-16 '>
                <h1 className='text-center text-violet-950 font-serif font-bold text-3xl mb-16'>Login</h1>
                <form onSubmit={handleSubmit(loginReq)} >
                    <div className='flex justify-center gap-4 flex-col'>
                        <input autoComplete='off' placeholder='email' {...register('email')} className='h-10 px-4 py-1 outline-gray-200 rounded-md border-2 w-72 mx-auto ' type="email" />
                        {(errors.email && <label className='text-xs font-semibold text-red-800 ml-24 mt-[-1rem]'>{errors.email.message}</label>)}

                        <input autoComplete='off' placeholder='password' {...register('password')} className='h-10 px-4 py-1 rounded-md outline-gray-200 border-2 w-72 mx-auto' type="password" />
                        {(errors.password && <label className='text-xs font-semibold text-red-800 ml-24 mt-[-1rem]'>{errors.password.message}</label>)}
                        <button className='bg-slate-700 mx-auto w-32 text-white rounded hover:bg-slate-800 py-2 mt-4' type='submit'>Login</button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default Login