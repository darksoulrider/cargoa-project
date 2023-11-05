

import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utills/ErrorHandler.js";



// to call api fro authentication service
import { Axios_Auth } from "../utills/AxiosInstance.js";
import { sendInvitatinLink } from "../sendEmail/inviteVendor.js";



export const sendInvite = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return next(new ErrorHandler("No email is given", 404))
    }

    await sendInvitatinLink(email)
    res.status(200).json({
        status: true,
        message: "Invitation sent successfully"
    })
})