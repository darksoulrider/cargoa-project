import orderModal from "../modal/OrderModel.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utills/ErrorHandler.js";
import { isValidDate } from "../utills/helper.js";
import axios from 'axios'
import { authservice } from "../constants/authServiceConstant.js";

import fs from 'fs';





// ********************** Create Order ************************
export const createOrder = catchAsyncError(async (req, res, next) => {

    if (!req.file) {
        return next(new ErrorHandler("No file is selected", 400))
    }

    // ********* uncomment later ***********
    let { title, quantity, date_of_shipping, vendor } = req.body;
    console.log(vendor)
    if (!title || !quantity || !date_of_shipping || !vendor) {
        return next(new ErrorHandler("Please provide all the fields", 400))
    }
    date_of_shipping = isValidDate(date_of_shipping);
    if (!date_of_shipping) return next(new ErrorHandler("Date error", 400))


    // ********************************************

    try {
        const vendorinfo = await axios.get(`${authservice.GET_VENDOR_INFO}?vendorid=${vendor}`)

        const data = await orderModal.create({
            orderCreatdBy: req.email,
            vendor: vendorinfo.data.user.email,
            title: title,
            quantity: quantity,
            date_of_shipping: date_of_shipping,
            orderpdf: req.file.filename
        })

        // ! create kafka service to sendemail here 


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



// *********************** Select the final Schedule *************

export const confirmSchedule = catchAsyncError(async (req, res, next) => {
    console.log("connfirem reached")
    const { schedule } = req.body;
    console.log(schedule);

    const useremail = req.email;
    const orderid = req.params.id;

    let order = await orderModal.findById({ _id: orderid });
    if (!order) return next(new ErrorHandler("order not found", 404))

    if (order.orderCreatdBy != useremail) {
        return next(new ErrorHandler("Invalid request", 400))
    }
    let arr = [order.shipping_schedule_1, order.shipping_schedule_2, order.shipping_schedule_3]
    if (!arr.includes(schedule)) {
        return next(new ErrorHandler("No valid schedule", 400))
    }
    if (order.confired_schedule) return next(new ErrorHandler("Already confirmed scheduled", 400))

    order.confired_schedule = schedule;
    await order.validate();
    order = await order.save();


    // ! send email to vendor after confirming the order-schedule
    res.status(200).json({
        success: true,
        order
    })

})