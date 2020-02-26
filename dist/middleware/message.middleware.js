"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _response = _interopRequireDefault(require("../helpers/response"));

var _mailer = require("../controllers/mailer");

var messageValidator = function messageValidator(req, res, next) {
  var _req$body = req.body,
      name = _req$body.name,
      message = _req$body.message,
      senderEmail = _req$body.senderEmail,
      receiversEmail = _req$body.receiversEmail,
      subject = _req$body.subject,
      date = _req$body.date;
  var userId = req.cookies.userId; // if body values are empty

  if (!name || !message || !senderEmail || !receiversEmail || !subject || !date) {
    return _response["default"].error(res, 'error', 400, 'entries should all be filled');
  } // name validation


  if (name.length < 3) {
    return _response["default"].error(res, 'error', 400, 'name should be more than 2 characters');
  } // senderemail validation


  if (!/[\w]+@[a-zA-Z]+\.[a-zA-Z]{2}/.test(senderEmail)) {
    return _response["default"].error(res, 'error', 400, 'invalid email format');
  } // receiveremail validation


  if (!/[\w]+@[a-zA-Z]+\.[a-zA-Z]{2}/.test(receiversEmail)) {
    return _response["default"].error(res, 'error', 400, 'invalid email format');
  } // date validation


  if (!/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.test(date)) {
    return _response["default"].error(res, 'error', 400, 'incorrect date format');
  } // if an older date is entered


  if (date < _mailer.comparing) {
    return _response["default"].error(res, 'error', 400, 'back date');
  }

  next();
};

var _default = messageValidator;
exports["default"] = _default;