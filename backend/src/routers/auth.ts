import express from 'express';
import authController from '../controllers/auth';

const router = express.Router();

router.post('/register', authController.registerUer);
router.post('/login', authController.loginUser);

export default router;
