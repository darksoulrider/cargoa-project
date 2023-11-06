import catchAsyncError from "./catchAsyncError.js";
import axios from "axios";

import jwt from "jsonwebtoken";

// **************** this middleware checks the authentication ******************
const isAuthenticated = catchAsyncError(async (req, res, next) => {
    let t;
    if (req.headers.authorization) {
        t = req.headers.authorization
    } else {
        t = req.headers.Authorization
    }
    let token = t.split(" ")[1]
    let secret = process.env.JWT_ACCESS_SECRET
    let user_decode = jwt.verify(token, secret);

    req.usertype = user_decode.usertype;
    req.email = user_decode.email;
    req.userid = user_decode._id;
    req.token = token;
    next();

})


export default isAuthenticated;