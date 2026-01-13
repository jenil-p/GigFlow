import express from 'express';

import { register, login, logout, getMe } from '../controllers/auth.controller.js'
import { checkForAuthenticationCookie } from '../middleware/authentication.middleware.js';

const router = express.Router();

router.post('/register' , register);
router.post('/login' , login);
router.get('/me' , checkForAuthenticationCookie("token") , getMe);
router.delete('/logout', checkForAuthenticationCookie("token"), logout);

export default router;