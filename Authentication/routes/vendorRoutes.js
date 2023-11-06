

import express from 'express'

const router = express.Router();

// ******* import the controller ********
import isAuthenticated from '../middlewares/isAuthMiddleware.js';
import * as vendorController from "../controllers/vendorController.js"

// ******* get single vendor ******
router.route("/vendor/info").get(isAuthenticated, vendorController.getSingleVendor)
// router.route("/vendor/:id").get(isAuthenticated, vendorController.getSingleVendor)

// ******* get all vendor *****
router.route("/vendor/getAllvendor").get(isAuthenticated, vendorController.getAllvendors) // ! restrict route if you want



export default router;