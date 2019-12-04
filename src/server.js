import express from 'express';
import dotenv from 'dotenv';
import uuid from 'uuid/v4';
import session from 'express-session';
import morgan from 'morgan';
import bodyParser from 'body-parser';

// Configure .env
dotenv.config();
const app = express();

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

const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
  console.log(req.sessionID)
  res.send('hello');
})

app.listen(PORT, () => {
  console.log(`Server runing on PORT ${PORT} visit http://localhost:${PORT}`);
})