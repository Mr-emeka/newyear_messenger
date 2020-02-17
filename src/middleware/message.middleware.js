import jsonResponse from '../helpers/response';
import { comparing } from '../controllers/mailer';

const messageValidator = (req, res, next) => {
    const { name, message, senderEmail, receiversEmail, date } = req.body;
    const userId = req.cookies.userId;

    // if body values are empty
    if (!name || !message || !senderEmail || !receiversEmail || !date) {
        return jsonResponse.error(res, 'error', 400, 'entries should all be filled');
    }

    // name validation
    if (name.length < 3) {
        return jsonResponse.error(res, 'error', 400, 'name should be more than 2 characters');
    }

    // senderemail validation
    if (!(/[\w]+@[a-zA-Z]+\.[a-zA-Z]{2}/.test(senderEmail))) {
        return jsonResponse.error(res, 'error', 400, 'invalid email format');
    }

    // receiveremail validation
    if (!(/[\w]+@[a-zA-Z]+\.[a-zA-Z]{2}/.test(receiversEmail))) {
        return jsonResponse.error(res, 'error', 400, 'invalid email format');
    }

    // date validation
    if (!(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.test(date))) {
        return jsonResponse.error(res, 'error', 400, 'incorrect date format');
    }

    // if an older date is entered
    if(date < comparing) {
        return jsonResponse.error(res, 'error', 400, 'back date');
    }

    next();
}

export default messageValidator; 