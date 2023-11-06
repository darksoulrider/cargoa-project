

import express from 'express'

const router = express.Router();

// ******* import the controller ********
import isAuthenticated from '../middlewares/isAuthMiddleware.js';



// ******** user inof routes *******  [ incase needed in future ]
router.route("/user/:id").get(isAuthenticated,)
router.route("/user/getAlluser") // ! restrict rout if you want with middelware



export default router;