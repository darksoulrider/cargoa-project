
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import cookieParser from 'cookie-parser'

// *********** app configuration **********
const app = express()

dotenv.config({
    path: "./config/.env"
})

app.use(cors({
    origin: [
        "http://127.0.0.1:4000",
        "*",
        "http://locahost:4000"
    ],

    // credentials: true,
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({
    extended: true,
}))
app.use(helmet())
app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'));
// **** ROUTES *****

import userOrderRoutes from "./routes/userOrderRoutes.js"
import vendorOrderRoutes from "./routes/vendorOrderRoutes.js"


app.use('/api/v2/user', userOrderRoutes)
app.use('/api/v2/vendor', vendorOrderRoutes)


// ********* Error middleware *************
import errormiddleware from "./middleware/errorMiddleware.js"
import ErrorHandler from "./utills/ErrorHandler.js"
app.use(errormiddleware)

export default app;