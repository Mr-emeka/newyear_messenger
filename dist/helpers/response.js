"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var jsonResponse = {
  error: function error(res, status, statusCode, message) {
    res.status(statusCode);
    res.json({
      status: status,
      message: message
    });
  },
  success: function success(res, status, statusCode, message) {
    res.status(statusCode);
    res.json({
      status: status,
      message: message
    });
  }
};
var _default = jsonResponse;
exports["default"] = _default;