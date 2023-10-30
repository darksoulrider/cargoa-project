import React from "react";
import * as yup from 'yup'



export const LoginYup = yup.object().shape({
    email: yup.string().email().required("Please enter your email"),
    password: yup.string()
        .required("please enter your password"),
})

export const SignupYup = yup.object().shape({
    firstname: yup.string().min(2, 'minimum 2 char').required("firstname is required"),
    lastname: yup.string().min(2, 'minimum 2 char').required("lastname is required"),
    email: yup.string().email().required("Please enter your email"),
    password: yup.string().min(8, "choose strong password").required("please enter your password"),
})