import React from "react";
import * as yup from 'yup'



export const createOrderYup = yup.object().shape({
    email: yup.string().email().required("Please enter your email"),
    password: yup.string()
        .required("please enter your password"),
})
