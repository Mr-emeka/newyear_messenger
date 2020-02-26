"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var message = new _mongoose.Schema({
  // senderID : {
  //     type: String,
  //     default: 'jjjjjj'
  // },
  // message: {
  //     type: String,
  //     required: true
  // },
  receiversEmail: {
    type: [],
    required: true
  },
  senderEmail: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

var messageSchema = _mongoose["default"].model('message', message);

var _default = messageSchema;
exports["default"] = _default;