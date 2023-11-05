import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"

import { useSignup_userMutation } from '../../../redux/API/AuthApi';
import { useSignup_vendorMutation } from '../../../redux/API/AuthApi';
import { SignupYup } from '../../../utils/YupValidation/AuthYup';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';


const Signup = () => {
    const navigate = useNavigate();
    const [usertype, setUsertype] = useState("user")
    const [vendor, setVendor] = useState(null)
    const [user, setUser] = useState(null)


    const handleRadioChange = (event) => {
        setUsertype(event.target.value);
    };


    // ******** api callinng ******
    const [signup_user, { isError: isErr_user, isSuccess: isSuc_user, isLoading: isLo_user }] = useSignup_userMutation();

    const [signup_vendor, { isError: isErr_vendor, isSuccess: isSuc_vendor, isLoading: isLo_vendor }] = useSignup_vendorMutation();


    // ****** Yup resolver ********
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(SignupYup)
    });


    const singnupReq = async (data) => {
        console.log(usertype)

        if (usertype == 'user') {
            const req = await signup_user({
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                password: data.password,
                usertype: usertype
            })
            setUser(req.data)

        } else if (usertype == 'vendor') {

            const res = await signup_vendor({
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                password: data.password,
                usertype: usertype
            })
            setVendor(res.data)

        }

    }

    useEffect(() => {
        if (isErr_vendor) {
            console.log('failed sdfds')
        }

        if (isSuc_vendor) {
            console.log('successfull request.')
            if (vendor) {
                console.log(vendor)
                localStorage.setItem('token', vendor.token)
                localStorage.setItem('usertype', 'vendor')

                navigate('/vendor/dashboard')
            }
        }

        if (isSuc_user) {
            console.log('successfull request.')
            if (user) {
                console.log(vendor)
                localStorage.setItem('token', user.token)
                localStorage.setItem('usertype', 'user')

                navigate('/user/dashboard')
            }
        }

    }, [isErr_vendor, isSuc_vendor, isSuc_user, vendor, user])





    return (
        <div className='flex justify-center items-center'>
            <div className='flex rounded-md w-[30rem] h-[35rem] mt-10 bg-gray-200 flex-col pt-16 '>
                <h1 className='text-center text-violet-950 font-serif font-bold text-3xl mb-10'>Signup</h1>
                <form onSubmit={handleSubmit(singnupReq)} >
                    <div className='flex justify-center gap-4 flex-col'>

                        <input autoComplete='off' {...register('firstname')} placeholder='firstname' className='h-10 px-4 py-1 outline-gray-200 rounded-md border-2 w-72 mx-auto ' type="text" />

                        {(errors.lastname && <label className='text-xs font-semibold text-red-800 ml-24 mt-[-1rem]'>{errors.lastname.message}</label>)}

                        <input autoComplete='off' {...register('lastname')} placeholder='lastname' className='h-10 px-4 py-1 rounded-md outline-gray-200 border-2 w-72 mx-auto' type="text" />
                        {(errors.lastname && <label className='text-xs font-semibold text-red-800 ml-24 mt-[-1rem]'>{errors.lastname.message}</label>)}

                        <input autoComplete='off' {...register('email')} placeholder='email' className='h-10 px-4 py-1 rounded-md outline-gray-200 border-2 w-72 mx-auto' type="email" />
                        {(errors.email && <label className='text-xs font-semibold text-red-800 ml-24 mt-[-1rem]'>{errors.email.message}</label>)}

                        <input autoComplete='off' {...register('password')} placeholder='password' className='h-10 px-4 py-4 rounded-md outline-gray-200 border-2 w-72 mx-auto' type="password" />
                        {(errors.password && <label className='text-xs font-semibold text-red-800 ml-24 mt-[-1rem]'>{errors.password.message}</label>)}

                        {/* ******************************************** */}
                        <div className='flex items-center gap-4 justify-center '>
                            <div className=''>
                                <input className='mr-2 cursor-pointer' type='radio' value="user" checked={usertype === 'user'} name='usertype' onChange={handleRadioChange} />
                                <label>User type</label>
                            </div>

                            <div>
                                <input className='mr-2 cursor-pointer' value="vendor" type='radio' checked={usertype === 'vendor'} name='usertype'
                                    onChange={handleRadioChange}
                                />
                                <label>Vendor type</label>
                            </div>
                        </div>
                        {/* ******************************************** */}

                        <button className='bg-slate-700 mx-auto w-32 text-white rounded hover:bg-slate-800 py-2 mt-4' type='submit'>{
                            (isLo_user || isLo_vendor) ?
                                <div className='text-center'>
                                    <Oval
                                        height={20}
                                        width={20}
                                        color="#4fa94d"
                                        wrapperStyle={{}}
                                        wrapperClass="text-center pl-12"
                                        visible={true}
                                        ariaLabel='oval-loading'
                                        secondaryColor="#4fa94d"
                                        strokeWidth={2}
                                        strokeWidthSecondary={2}
                                    />
                                </div>
                                : <p>Sign up</p>
                        }</button>
                    </div>
                </form>
            </div>

        </div >

    )
}

export default Signup