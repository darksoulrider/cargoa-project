import catchAsyncError from "./catchAsyncError.js";
import axios from "axios";

import jwt from "jsonwebtoken";


const isAuthenticated = catchAsyncError(async (req, res, next) => {
    let token = req.headers.cookie.split("=")[1]
    console.log(token)
    let secret = process.env.JWT_ACCESS_SECRET
    let user_decode = jwt.verify(token, secret);

    req.usertype = user_decode.usertype;
    req.email = user_decode.email;
    req.userid = user_decode._id;




    next();

})


export default isAuthenticated;