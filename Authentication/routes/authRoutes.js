
import express from 'express'

const router = express.Router();

// ******* import the controller ********

import * as usercontroller from "../controllers/authController.js"
import { isAuthenticated } from '../services/VerifytokenService.js';


// ************ Auth routes defined ***********
router.route("/signup-user").post(usercontroller.signup_user)
router.route("/signup-vendor").post(usercontroller.signup_vendor)
router.route("/login").post(usercontroller.login)
router.route("/logout").get(usercontroller.logout)





export default router;