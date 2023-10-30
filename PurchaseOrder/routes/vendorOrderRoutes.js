import express from 'express'

const router = express.Router();

// ******** imports **************

import isAuthenticated from '../middleware/isAuthenticated.js';
import * as order from "../controllers/vendor-order-controller.js"
// router.route('/order-create').post(isAuthenticated);


router.route("/Schedule-set/:id").post(isAuthenticated, order.setSchedule)



export default router;