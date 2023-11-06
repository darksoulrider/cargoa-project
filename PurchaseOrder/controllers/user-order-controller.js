import orderModal from "../modal/OrderModel.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utills/ErrorHandler.js";
import { isValidDate } from "../utills/helper.js";
import axios from 'axios'
import { authservice } from "../constants/authServiceConstant.js";
import { produceMessage } from "../kafka/producer.js";

import fs from 'fs';

// to call api fro authentication service
import { Axios_Auth } from "../utills/AxiosInstance.js";



// ********************** Create Order ************************
export const createOrder = catchAsyncError(async (req, res, next) => {


    if (!req.file) {
        return next(new ErrorHandler("No file is selected", 400))
    }

    // ********* uncomment later ***********
    let { title, quantity, date_of_shipping, vendor } = req.body;

    if (!title || !quantity || !date_of_shipping || !vendor) {
        return next(new ErrorHandler("Please provide all the fields", 400))
    }

    date_of_shipping = isValidDate(date_of_shipping);
    if (!date_of_shipping) return next(new ErrorHandler("Date error", 400))

    let userEmail = req.email;
    // ********************************************

    try {


        const vendorinfo = await Axios_Auth.get(`${authservice.GET_VENDOR_INFO}/?id=${vendor}`, {
            headers: {
                "authorization": `token ${req.token}`
            }
        })


        const data = await orderModal.create({
            orderCreatedBy: userEmail,
            vendor: vendorinfo.data.vendor.email,
            title: title,
            quantity: quantity,
            date_of_shipping: date_of_shipping,
            orderpdf: req.file.filename
        })

        // ! create kafka service to produce
        try {

            const k_data = {
                orderCreatedBy: data.orderCreatedBy,
                message: `${orderCreatedBy} - created order`,
                vendor: data.vendor,
            }


            await produceMessage('order', data)
        } catch (error) {
            console.log(`Kafka-produce Error occured: ${error.message}`)
        }

        res.status(200).json({
            success: true,
            order: data
        })

    } catch (error) {

        fs.unlink(req.file.path, (unlinkError) => {
            if (unlinkError) {
                console.error('Error removing file:', unlinkError);
            } else {
                console.log('File removed successfully');
            }

        });
        return next(new ErrorHandler(`Order creation failed - ${error} `, 400))


    }
})



// ********************* Get all the orders ********************

export const getAllUserOrder = catchAsyncError(async (req, res, next) => {

    const userEmail = req.email.toLowerCase()

    let userOrders = await orderModal.find({ orderCreatedBy: userEmail })

    if (!userOrders) {
        return next(new ErrorHandler('No orders available', 404))
    }

    res.status(200).json({
        success: true,
        orders: userOrders
    })

})

export const getUserSingleOrder = catchAsyncError(async (req, res, next) => {

    const order_id = req.params.id;
    const userEmail = req.email.toLowerCase()
    const order = await orderModal.findOne({ orderCreatedBy: userEmail, _id: order_id })
    if (!order) {
        return next(new ErrorHandler('No order found', 404))
    }

    res.status(200).json({
        success: true,
        order: order
    })



})


// *********************** Select the confirm Schedule *************

export const confirmSchedule = catchAsyncError(async (req, res, next) => {
    console.log(req.body)
    const useremail = req.email;
    const orderid = req.params.id;
    let { schedule } = req.body;
    // schedule = isValidDate(schedule);
    let order = await orderModal.findById({ _id: orderid });
    if (!order) return next(new ErrorHandler("order not found", 404))

    if (order.orderCreatedBy != useremail) {
        return next(new ErrorHandler("Invalid request", 400))
    }
    let arr;
    if (!order.vendorAction) {
        return next(new ErrorHandler("No schedule available", 400))
    }

    try {
        arr = [order.shipping_schedule_1, order.shipping_schedule_2, order.shipping_schedule_3]
    } catch (e) {
        return next(new ErrorHandler("No valid schedule", 400))
    }
    if (!arr.includes(schedule)) {
        console.log(arr)
        console.log(schedule)
        return next(new ErrorHandler("No valid schedule", 400))
    }
    if (order.confirmed_schedule) return next(new ErrorHandler("Already confirmed scheduled", 400))

    order.confirmed_schedule = schedule;
    order.userAction = true;
    await order.validate();
    order = await order.save();


    // ! send email to vendor after confirming the order-schedule
    res.status(200).json({
        success: true,
        order
    })

})