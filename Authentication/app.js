
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

dotenv.config({
    path: './config/.env'
})

const app = express();

app.use(
    cors({
        // origin: [
        //     "http://127.0.0.1:5174",
        //     "http://127.0.0.1:4000",
        //     "http://192.168.1.25:4000"
        // ]

        origin: "*",
        // credentials: true
    }),


)

app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({
    extended: true,
}))
app.use(helmet())
app.use(morgan('dev'))





// *********** Routes Configuration ***********

import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import vendorRotes from './routes/vendorRoutes.js'
app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes)
app.use("/api/v1", vendorRotes)






// keep this for errormiddleware
import errormiddleware from './middlewares/errorMiddleware.js';
app.use(errormiddleware)
export default app;

