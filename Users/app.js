
import express from "express"
import dotenv from "dotenv"

const app = express()

dotenv.config({
    path: "./config/.env"
})

pp.use(cors({
    origin: "*",
}))
app.use(express.json())
app.use(express.urlencoded({
    extended: true,
}))
app.use(helmet())
app.use(morgan('dev'))

// **** ROUTES *****
import orderRoutes from './routes/order-create.js'
app.use("/api", orderRoutes)



// ********* Error middleware *************
import errormiddleware from "./middleware/errorMiddleware.js"
app.use(errormiddleware)

export default app;