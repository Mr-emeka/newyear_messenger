import { Router } from 'express';
import postMessage from '../controllers/message';
import validateCookie from '../middleware/cookieValidator';

const router = Router();

router.post('/create', validateCookie , postMessage);

export default router;