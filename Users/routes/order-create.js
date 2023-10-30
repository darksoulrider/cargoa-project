import express from 'express'
const routes = express.Router()

// ********* Import controller ******
import * as purchasorder from "../controllers/order-create-controller.js"

routes.route('/create-order').post(purchasorder.createOrder)