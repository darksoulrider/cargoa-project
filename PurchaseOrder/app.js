
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"



const app = express()

dotenv.config({
    path: "./config/.env"
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true,
}))
app.use(helmet())
app.use(morgan('dev'))

// **** ROUTES *****

import userOrderRoutes from "./routes/userOrderRoutes.js"
import vendorOrderRoutes from "./routes/vendorOrderRoutes.js"


app.use('/api/user', userOrderRoutes)
app.use('/api/vendor', vendorOrderRoutes)


// ********* Error middleware *************
import errormiddleware from "./middleware/errorMiddleware.js"
import ErrorHandler from "./utills/ErrorHandler.js"
app.use(errormiddleware)

export default app;