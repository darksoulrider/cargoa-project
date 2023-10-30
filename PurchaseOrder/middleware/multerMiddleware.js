import multer from "multer";
import crypto from 'crypto'
import ErrorHandler from "../utills/ErrorHandler.js";
import path from 'path';


// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {

        const randm = crypto.randomBytes(12).toString('hex')
        cb(null, `${randm}${path.extname(file.originalname)}`)
    },

})

const uploadfile = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.toString() != "application/pdf") {
            cb(new ErrorHandler("Only pdf format allowed", 400))
        } else {
            cb(null, true)
        }
    }

}).single('file')


export default uploadfile

