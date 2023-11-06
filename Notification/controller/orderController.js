

import catchAsyncError from "../middleware/catchAsyncError.js"
import notify_modal from "../modal/Notification.js"
import ErrorHandler from "../utills/ErrorHandler.js"

export const getNotification = catchAsyncError(async (req, res, next) => {

    const email = req.email;
    const nt = await notify_modal.find({ affectedID: email })
    if (!nt) {
        return next(ErrorHandler("No notification available", 404))
    }

    res.status(200).json({
        success: true,
        notification: nt
    })
})