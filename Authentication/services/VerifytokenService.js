

import jwt from "jsonwebtoken";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";



// this controller here if do not want to copy jwt secret
export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.body;
    console.log("hit Is authenticated...")

    if (!token) {
        return next(new ErrorHandler("Invalid token", 400))
    }

    const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

    res.status(200).json({
        email: decode.email,
        usertype: decode.usertype,
        id: decode._id
    })

})