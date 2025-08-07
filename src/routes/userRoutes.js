import { Router } from 'express';
import { register, login, me } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.use(authMiddleware);
router.get('/me', me);

export default router;