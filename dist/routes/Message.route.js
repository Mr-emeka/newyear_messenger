"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _message = require("../controllers/message");

var _cookieValidator = _interopRequireDefault(require("../middleware/cookieValidator"));

var _message2 = _interopRequireDefault(require("../middleware/message.middleware"));

var router = (0, _express.Router)();
router.post('/create', _message2["default"], _cookieValidator["default"], _message.postMessage);
router.get('/message/:id', _message.getMessages);
var _default = router;
exports["default"] = _default;