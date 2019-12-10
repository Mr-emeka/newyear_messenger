import { Router } from 'express';
import postMessage from '../controllers/message';

const router = Router();

router.post('/create', postMessage);

export default router;