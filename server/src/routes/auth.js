import { Router } from 'express';
import { login, signup, requestReset, resetPassword } from '../controllers/authController.js';

const router = Router();
router.post('/signup', signup);
router.post('/login', login);
router.post('/request-reset', requestReset);
router.post('/reset', resetPassword);
export default router;
