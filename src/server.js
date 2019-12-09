import express from 'express';
import dotenv from 'dotenv';
import uuid from 'uuid/v4';
import session from 'express-session';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
// response helper
import jsonResponse from './helpers/helper'; 

// Configure .env
dotenv.config();
const app = express();

mongoose.connect(`mongodb+srv://newyear:${process.env.DB_PASSWORD}@cluster0-mdsrn.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser : true, useUnifiedTopology: true})
.then(() => {
  console.log('database connected successfully')
})
.catch(e => console.log(e))

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// configure session
app.use(session({
  genid: (req) => {
  console.log(req.sessionID);
  return uuid();
  },
   secret: process.env.SESSION_KEY,
   resave: false,
   saveUninitialized: true
}))

// port
const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
  console.log(req.sessionID)
  jsonResponse.success(res, 'success', 200, 'hello');
})

app.use('*', (req, res) => {
  jsonResponse.error(res, 'error', 404, 'incorrect route');
})

app.listen(PORT, () => {
  console.log(`Server runing on PORT ${PORT} visit http://localhost:${PORT}`);
})