"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMessages = exports.postMessage = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _database = _interopRequireDefault(require("../models/database"));

var _response = _interopRequireDefault(require("../helpers/response"));

// import messageSchema from '../models/db';
var postMessage = function postMessage(req, res) {
  var _req$body, name, message, senderEmail, receiversEmail, subject, date, userId, save;

  return _regenerator["default"].async(function postMessage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, message = _req$body.message, senderEmail = _req$body.senderEmail, receiversEmail = _req$body.receiversEmail, subject = _req$body.subject, date = _req$body.date;
          userId = req.cookies.userId;
          _context.next = 5;
          return _regenerator["default"].awrap(_database["default"].query("INSERT INTO messages (user_id, name, sender_email, receiver_emails, subject, message, date) \n        VALUES ($1, $2, $3, ARRAY [$4], $5, $6, $7) RETURNING *", [userId, name, senderEmail, receiversEmail.split(' '), subject, message, date]));

        case 5:
          save = _context.sent;

          _response["default"].success(res, 'success', 201, {
            data: save.rows[0]
          });

          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.postMessage = postMessage;

var getMessages = function getMessages(req, res) {
  var userId, myMessages;
  return _regenerator["default"].async(function getMessages$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          userId = req.cookies.userId;
          _context2.next = 4;
          return _regenerator["default"].awrap(_database["default"].query("SELECT * FROM messages WHERE user_id=$1", [userId]));

        case 4:
          myMessages = _context2.sent;
          return _context2.abrupt("return", _response["default"].success(res, 'success', 200, {
            data: myMessages.rows
          }));

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getMessages = getMessages;