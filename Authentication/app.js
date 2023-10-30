
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import morgan from 'morgan';
import helmet from 'helmet';


dotenv.config({
    path: './config/.env'
})

const app = express();

app.use(
    cors({
        origin: [
            "http://127.0.0.1:5174",
            "http://192.168.91.1:5174",
	    "http://127.0.0.1:4001"
        ]
    })
)
app.use(express.json())
app.use(express.urlencoded({
    extended: true,
}))
app.use(helmet())
app.use(morgan('dev'))





// *********** Routes Configuration ***********

import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
app.use("/api", authRoutes);
app.use("/api", userRoutes)






// keep this for errormiddleware
import errormiddleware from './middlewares/errorMiddleware.js';
app.use(errormiddleware)
export default app;

