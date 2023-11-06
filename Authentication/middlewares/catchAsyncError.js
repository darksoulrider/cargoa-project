

// ******** this is part of gloable error handling [ promise ] ***********
const catchAsyncError = (func) => (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch(next);
}

export default catchAsyncError;