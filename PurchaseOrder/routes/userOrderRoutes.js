import express from 'express'

const router = express.Router();

// ******** imports **************
import * as userOrder from '../controllers/user-order-controller.js'
import isAuthenticated from '../middleware/isAuthenticated.js';
import uploadfile from '../middleware/multerMiddleware.js';
// import uploadfile from '../middleware/multerMiddleware.js';
// ! ---- Later implement is authenticated -----------



// ************** User actions *******************
router.route('/create-order').post(isAuthenticated, uploadfile, userOrder.createOrder);
router.route('/order/confirm/:id').post(isAuthenticated, userOrder.confirmSchedule); // ! check if upload file is important or not


// ********** Get all orders ************8
router.route('/order/all').get(isAuthenticated, userOrder.getAllUserOrder)
router.route('/order/:id').get(isAuthenticated, userOrder.getUserSingleOrder)



// ************** Vendor actions *******************




export default router;