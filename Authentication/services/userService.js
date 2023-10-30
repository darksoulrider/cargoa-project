

import catchAsyncError from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import UserModal from "../modal/UsersModal.js"
import sendtoken from "../utils/sendtoken.js";



export const getuser = catchAsyncError(async (req, res, next) => {


    // if (!userid) {
    //     return next(new ErrorHandler("No userid given", 400))
    // }
    // let user = await UserModal.findOne({ userid });
    // if (!user || user.usertype != 'user') {
    //     return next(new ErrorHandler("No user found", 400))
    // }

    console.log(req.body)
    console.log(req)
    console.log(req.params)



    res.status(200).json({
        message: true,
        // user: user
    })

})
export const getvendor = catchAsyncError(async (req, res, next) => {


    const { vendorid } = req.query;

    if (!vendorid) {
        return next(new ErrorHandler("No Userid given", 400))
    }
    let user = await UserModal.findOne({ email: vendorid });

    if (!user || user.usertype != 'vendor') {
        return next(new ErrorHandler("No user found", 400))
    }
    res.status(200).json({
        message: true,
        user: user
    })

})