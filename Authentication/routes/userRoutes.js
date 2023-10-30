
import express from 'express'

const router = express.Router();

// ******* import the controller ********

import * as usercontroller from "../services/userService.js"
import isAuthenticated from '../middlewares/isAuthMiddleware.js';

router.route('/userinfo').get(isAuthenticated, usercontroller.getuser)
router.route('/vendorinfo').get(usercontroller.getvendor)




export default router;