import express from 'express';
import { createGig, getGigs, getGig } from '../controllers/gig.controller.js';

import { checkForAuthenticationCookie } from '../middleware/authentication.middleware.js';

const router = express.Router();

router.get("/", getGigs);

router.get("/:id", getGig);

router.post("/", checkForAuthenticationCookie("token"), createGig);


export default router;