import uuid from 'uuid/v4';
import jsonResponse from '../helpers/response';

const validateCookie = (req, res, next) => {
    if (req.cookies.userId) {
      return next();
    }
    else {
      res.cookie('userId', uuid())
      jsonResponse.success(res, 'success', 201, 'user id created');
      next();
    }
}

export default validateCookie; 