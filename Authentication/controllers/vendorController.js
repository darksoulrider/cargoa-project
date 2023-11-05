import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import UserModal from "../modal/UsersModal.js";
import { all } from "axios";

export const getSingleVendor = catchAsyncError(async (req, res, next) => {

    // const vendor_id = req.params.id; // or query.id
    const vendor_id = req.query.id; // or query.id

    if (!vendor_id) {
        return next(new ErrorHandler("No vendor id given", 400))
    }
    let vendor = await UserModal.findOne({ email: vendor_id });

    if (!vendor || vendor.usertype != 'vendor') {
        return next(new ErrorHandler("No vendor found", 400))
    }
    console.log("Query fullfilled")

    res.status(200).json({
        success: true,
        vendor
    })

})


export const getAllvendors = catchAsyncError(async (req, res, next) => {

    const all_vendor = await UserModal.find({ usertype: 'vendor' })
    let emails = all_vendor.map(e => e.email)

    res.status(200).json({
        vendor: emails
    })
})