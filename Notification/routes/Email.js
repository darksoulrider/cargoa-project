import express from 'express'

const router = express.Router();

// ******** imports **************

import isAuthenticated from '../middleware/isAuthenticated.js';
import * as invite from "../controller/InviteController.js"

router.route('/vendor/invite').post(isAuthenticated, invite.sendInvite)

export default router;