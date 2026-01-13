import express from 'express';
import { createGig, getGigs, getGig, getMyGigs } from '../controllers/gig.controller.js';

import { checkForAuthenticationCookie } from '../middleware/authentication.middleware.js';

const router = express.Router();

router.get("/", getGigs);

router.get("/:id", getGig);

router.post("/", checkForAuthenticationCookie("token"), createGig);

router.get("/mygig" , checkForAuthenticationCookie("token") , getMyGigs);

export default router;