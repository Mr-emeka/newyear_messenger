import { Router } from 'express';
import sendEmail from '../controllers/mailer';
// import validateCookie from '../middleware/cookieValidator';

const sendRouter = Router();

sendRouter.get('/send', sendEmail);

export default sendRouter;