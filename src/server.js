import express from 'express';
import dotenv from 'dotenv';
import uuid from 'uuid/v4';
// import session from 'express-session';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cron from 'node-cron';
import cookieParser from 'cookie-parser';

// response helper
import jsonResponse from './helpers/helper';


// routers
import router from './routes/postMessage.route';

// Configure .env
dotenv.config();
const app = express();

// mongoose.connect('mongodb+srv://newyear:elegantdevelopers@cluster0-mdsrn.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useMongoClient: true })
//   .then(() => {
//     console.log('database connected successfully')
//   })
//   .catch(e => console.log(e))

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;


app.use('/api/v1', router);



app.use('*', (req, res) => {
  jsonResponse.error(res, 'error', 404, 'incorrect route');
})

app.listen(PORT, () => {
  console.log(`Server runing on PORT ${PORT} visit http://localhost:${PORT}`);
})
// To enable test
export default app;