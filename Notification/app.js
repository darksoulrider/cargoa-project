
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import cookieParser from 'cookie-parser'

// ********* APP CONFIGURATION *************
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

}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({
    extended: true,
}))
app.use(helmet())
app.use(morgan('dev'))

// *********** Routes ***********

import EmailRoutes from "./routes/Email.js"
import Orderroutes from './routes/OrderNotification.js'
app.use('/api/v3', EmailRoutes)
app.use('/api/v3', Orderroutes)


// ********* Error middleware *************
import errormiddleware from "./middleware/errorMiddleware.js"
app.use(errormiddleware)

export default app;