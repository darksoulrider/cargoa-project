import orderModal from "../modal/OrderModel.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utills/ErrorHandler.js";
import uploadfile from "../middleware/multerMiddleware.js";
import { isValidDate } from "../utills/helper.js";
import jwt from 'jsonwebtoken'
import axios from 'axios'
import { authservice } from "../constants/authServiceConstant.js";
import { produceMessage } from "../kafka/producer.js";

// ********** Set Schedule for the order ***************

export const setSchedule = catchAsyncError(async (req, res, next) => {
    console.log(req.body)
    let orderid = req.params.id
    let { shipping_schedule_1, shipping_schedule_2, shipping_schedule_3 } = req.body;
    console.log(shipping_schedule_1, shipping_schedule_2, shipping_schedule_3)
    shipping_schedule_1 = isValidDate(shipping_schedule_1)
    shipping_schedule_2 = isValidDate(shipping_schedule_2)
    shipping_schedule_3 = isValidDate(shipping_schedule_3)
    console.log(shipping_schedule_1, shipping_schedule_2, shipping_schedule_3)

    if (!shipping_schedule_1 || !shipping_schedule_2 || !shipping_schedule_3) {
        return next(new ErrorHandler("Please provide 3 schedule", 400))
    }

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

    // *************** kafka producer ***********
    try {

        const k_data = {
            orderCreatedBy: order.orderCreatedBy,
            message: `${order.vendor} -Vendor set schedule for order`,
            vendor: order.vendor,
            orderid: order._id,
            key: 'vendor-schedule'
        }
        console.log(k_data)
        await produceMessage('order', k_data)
    } catch (error) {
        console.log(`Kafka-produce Error occured: ${error.message}`)
    }



    res.status(200).json({
        success: true,
        order: order
    })
})


// ************************ Get all vendors orders **********************8


export const getAllOrder = catchAsyncError(async (req, res, next) => {

    const vendorEmail = req.email.toLowerCase()

    let vendorOrders = await orderModal.find({ vendor: vendorEmail })

    if (!vendorOrders) {
        return next(new ErrorHandler('No orders available', 404))
    }

    res.status(200).json({
        success: true,
        orders: vendorOrders
    })
})



// ****************** get single order *******************

export const getSingleOrder = catchAsyncError(async (req, res, next) => {

    const order_id = req.params.id;
    const userEmail = req.email.toLowerCase()

    const order = await orderModal.findOne({ vendor: userEmail, _id: order_id })
    if (!order) {
        return next(new ErrorHandler('No order found', 404))
    }

    res.status(200).json({
        success: true,
        order: order
    })



})
