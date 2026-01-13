import express from 'express';
import { createBid, getBidsByGig, hireFreelancer, deleteBid } from '../controllers/bid.controller.js';
import { checkForAuthenticationCookie } from '../middleware/authentication.middleware.js';

const router = express.Router();

router.post("/:gigId", checkForAuthenticationCookie("token"), createBid);

router.get("/:gigId", checkForAuthenticationCookie("token"), getBidsByGig);

router.delete("/:gigId", checkForAuthenticationCookie("token"), deleteBid);

router.patch("/:bidId/hire", checkForAuthenticationCookie("token"), hireFreelancer);

export default router;