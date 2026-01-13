import express from 'express';

import { getMyGigs, getMyBids } from '../controllers/me.controller.js'

import { checkForAuthenticationCookie } from '../middleware/authentication.middleware.js';

const router = express.Router();


router.get("/gigs", checkForAuthenticationCookie("token"), getMyGigs);
router.get("/bids", checkForAuthenticationCookie("token"), getMyBids);


export default router;