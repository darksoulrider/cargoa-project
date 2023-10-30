import orderModal from "../modal/OrderModel.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utills/ErrorHandler.js";
import uploadfile from "../middleware/multerMiddleware.js";
import { isValidDate } from "../utills/helper.js";
import jwt from 'jsonwebtoken'
import axios from 'axios'
import { authservice } from "../constants/authServiceConstant.js";

import fs from 'fs';


// ********** Set Schedule for the order ***************

export const setSchedule = catchAsyncError(async (req, res, next) => {

    const { shipping_schedule_1, shipping_schedule_2, shipping_schedule_3 } = req.body;
    if (!shipping_schedule_1 || !shipping_schedule_2 | !shipping_schedule_1) {
        return next(new ErrorHandler("Please provide 3 schedule", 400))
    }
    let orderid = req.params.id
    console.log(orderid)

    let order = await orderModal.findById({ _id: orderid });
    if (!order) return next(new ErrorHandler("No order found", 400))

    let vendoremail = req.email;
    if (vendoremail != order.vendor) return next(new ErrorHandler("Invalid requst", 400))

    if (order.vendorAction == true) {
        return next(new ErrorHandler("No twice changes allowed ", 400))
    }
    order.shipping_schedule_1 = shipping_schedule_1;
    order.shipping_schedule_2 = shipping_schedule_2;
    order.shipping_schedule_3 = shipping_schedule_3;
    order.vendorAction = true;

    await order.validate();
    order = await order.save()

    res.status(200).json({
        success: true,
        order: order
    })
})




