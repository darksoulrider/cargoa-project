import React from "react";
import * as yup from 'yup'
const today = new Date();


// yup validation
export const createOrderYup = yup.object().shape({
    title: yup.string().required("Please enter your email"),
    vendor: yup.string().required("Please enter Vendor email"),
    quantity: yup.number().min(1, "Minimum 1 quantity is required")
        .required("please enter quantity").typeError("Invalid type of quantity"),
    date: yup.date().min(today, "dates should not represent past").required("Please enter date").typeError("Invalid Date"),
})
