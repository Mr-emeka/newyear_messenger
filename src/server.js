import express from 'express';
import dotenv from 'dotenv';
import uuid from 'uuid/v4';
// import session from 'express-session';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cron from 'node-cron';
import cookieParser from 'cookie-parser';
import schedule from 'node-schedule';
import path from 'path';

// response helper
import jsonResponse from './helpers/response';


// routers
//welcome route
// import welcomeRoute from './routes/welcome.route';
// message route
import messageRoute from './routes/Message.route';
import validateCookie from './middleware/cookieValidator';

// Configure .env
dotenv.config();
const app = express();

//ejs
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.get('/', validateCookie, (req, res) => {
  res.render('index')
});
app.use('/api/v1', messageRoute);

app.use('*', (req, res) => {
  
  jsonResponse.error(res, 'error', 404, 'incorrect route');
})

app.listen(PORT, () => {
  console.log(`Server runing on PORT ${PORT} visit http://localhost:${PORT}`);
})
// To enable test
export default app;