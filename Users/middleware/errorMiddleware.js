import ErrorHandler from "../utils/ErrorHandler.js";

const errormiddleware = (err, req, res, next) => {
    err.message = err.message || "Something went  wrong";
    err.statuscode = err.statuscode || 500


    if (err.code === 11000) {
        // Mongoose duplicate key error
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    // Wrong JWT error
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, Try again `;
        err = new ErrorHandler(message, 400);
    }

    // JWT EXPIRE error
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is Expired, Try again `;
        err = new ErrorHandler(message, 400);
    }



    res.status(err.statuscode).json({
        message: err.message,
        success: false
    })
}

export default errormiddleware;