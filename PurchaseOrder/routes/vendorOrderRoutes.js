import express from 'express'

const router = express.Router();

// ******** imports **************

import * as order from "../controllers/vendor-order-controller.js"
import isAuthenticated from '../middleware/isAuthenticated.js';



router.route("/order/offerschedule/:id").post(isAuthenticated, order.setSchedule)

// ********** Get all orders ************
router.route('/order/all').get(isAuthenticated, order.getAllOrder)
router.route('/order/:id').get(isAuthenticated, order.getSingleOrder)
// router.route('/order/:id').get(isAuthenticated)


export default router;