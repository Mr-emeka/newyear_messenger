import uuid from 'uuid/v4';
import jsonResponse from '../helpers/response';

const validateCookie = (req, res, next) => {
    if (req.cookies.userId) {
      console.log('cookie exists');
     return next();
    }
    else {
      res.cookie('userId', uuid())
      console.log('cookie created');
      res.render('index');
    }
    next();

}

export default validateCookie; 