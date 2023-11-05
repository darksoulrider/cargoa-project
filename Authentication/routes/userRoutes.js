

import express from 'express'

const router = express.Router();

// ******* import the controller ********


import isAuthenticated from '../middlewares/isAuthMiddleware.js';


// ! if user exist [ change later on this ]
// router.route('/userinfo').get(isAuthenticated, usercontroller.getuser)
// router.route('/vendorinfo').get(usercontroller.getvendor)

// ******** get single user info *******888
router.route("/user/:id").get(isAuthenticated,)

// ******** get all user info *******888
router.route("/user/getAlluser") // ! restrict rout if you want with middelware


// ! crud make

export default router;