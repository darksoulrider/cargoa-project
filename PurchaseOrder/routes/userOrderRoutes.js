import express from 'express'

const router = express.Router();

// ******** imports **************
import * as order from '../controllers/user-order-controller.js'
import isAuthenticated from '../middleware/isAuthenticated.js';
import uploadfile from '../middleware/multerMiddleware.js';
// import uploadfile from '../middleware/multerMiddleware.js';
// ! ---- Later implement is authenticated -----------

router.route('/create-order').post(isAuthenticated, uploadfile, order.createOrder);
router.route('/confirmSchedule/:id').post(isAuthenticated, uploadfile, order.confirmSchedule);




export default router;