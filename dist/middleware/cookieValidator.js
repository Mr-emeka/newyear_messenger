"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _v = _interopRequireDefault(require("uuid/v4"));

var _response = _interopRequireDefault(require("../helpers/response"));

var validateCookie = function validateCookie(req, res, next) {
  if (req.cookies.userId) {
    console.log('cookie exists');
    return next();
  } else {
    res.cookie('userId', (0, _v["default"])(), {
      httpOnly: true
    });
    console.log('cookie created'); // res.render('index');
  }

  next();
};

var _default = validateCookie;
exports["default"] = _default;