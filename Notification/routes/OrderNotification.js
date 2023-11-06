
import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js'

const router = express.Router()
import * as notify from "../controller/orderController.js"


router.route('/notification').get(isAuthenticated, notify.getNotification)


export default router