
import express from 'express'

const router = express.Router();

// ******* import the controller ********

import * as usercontroller from "../controllers/authController.js"
import { isAuthenticated } from '../services/VerifytokenService.js';



router.route("/signup-user").post(usercontroller.signup_user)
router.route("/signup-vendor").post(usercontroller.signup_vendor)
router.route("/login").post(usercontroller.login)
router.route("/logout").get(usercontroller.logout)
// router.route("/forgetpassword").post()

// router.route("/isAuth").post(verify.isAuthenticated); // just to chek by requst




export default router;