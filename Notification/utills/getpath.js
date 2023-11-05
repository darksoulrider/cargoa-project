
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
import app from '../../Users/app.js';
// console.log(path.extname(__filename))

import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        if (!file) {
            return cb(new ErrorHandler("Error", 500));
        }
        const randm = crypto.randomBytes(12).toString('hex')
        cb(null, `${randm}${path.extname(file.originalname)}`)
    },

})

const uploadfile = multer({
    storage: storage,

})

app.post('/upload', uploadfile.single('file'), async (req, res, next) => {

    console.log("message");
    res.json({
        message: true,
    })
})



