
import catchAsyncError from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import UserModal from "../modal/UsersModal.js"
import bcryptjs from 'bcryptjs';
import sendtoken from "../utils/sendtoken.js";

export const signup_user = catchAsyncError(async (req, res, next) => {
    console.log("signup user hit")

    const { firstname, lastname, email, password, usertype } = req.body;

    if (!firstname || !lastname || !email || !password || !usertype) {
        return next(new ErrorHandler("Please provide all required fields.", 400))
    }
    if (usertype != 'user') return next(new ErrorHandler("Invalid user type", 400))
    let user = await UserModal.findOne({ email: email });
    if (user) return next(new ErrorHandler("User already exists", 400))

    let pwd = await bcryptjs.hash(password, 12);

    user = await UserModal.create({ firstname, lastname, email, password: pwd, usertype })
    sendtoken(res, user, "user created", 201);

})

// just to make it flexible in future [ different controller ]
export const signup_vendor = catchAsyncError(async (req, res, next) => {
    console.log("signup vendor hit")

    const { firstname, lastname, email, password, usertype } = req.body;

    if (!firstname || !lastname || !email || !password || !usertype) {
        return next(new ErrorHandler("Please provide all required fields.", 400))
    }
    if (usertype != 'vendor') return next(new ErrorHandler("Invalid user type", 400))
    let user = await UserModal.findOne({ email: email });
    if (user) return next(new ErrorHandler("User already exists", 400))

    let pwd = await bcryptjs.hash(password, 12);

    user = await UserModal.create({ firstname, lastname, email, password: pwd, usertype })

    sendtoken(res, user, "vendor created", 201);

});

export const login = catchAsyncError(async (req, res, next) => {

    console.log("login hit")
    const { email, password } = req.body;
    if (!email || !password) return next(new ErrorHandler("Please provide all fields", 400))

    let user = await UserModal.findOne({ email: email });
    if (!user) return next(new ErrorHandler("Email or password is incorrect.", 404))

    const isMatch = await user.comparepwd(password);
    if (!isMatch) return next(new ErrorHandler("Email or password is incorrect.", 404))

    sendtoken(res, user, "Login successfull", 200);

});

export const logout = async (req, res, next) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })


    res.status(200).json({
        message: "Loged out successfully",
        success: true
    })
}

export const forgetPassword = async (req, res, next) => {

}

