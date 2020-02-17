import { Router } from 'express';
import { postMessage, getMessages } from '../controllers/message';
import validateCookie from '../middleware/cookieValidator';
import messageValidator from '../middleware/message.middleware';

const router = Router();

router.post('/create', messageValidator, validateCookie , postMessage);
router.get('/message/:id', getMessages);

export default router;