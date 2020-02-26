"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comparing = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _nodeSchedule = _interopRequireDefault(require("node-schedule"));

var _database = _interopRequireDefault(require("../models/database"));

var _mailer = _interopRequireDefault(require("../helpers/mailer"));

var _response = _interopRequireDefault(require("../helpers/response"));

var selectedDay = new Date();
var year, month, date, hour, minute, second;
year = selectedDay.getFullYear();
month = selectedDay.getMonth();
date = selectedDay.getDate();
hour = selectedDay.getHours();
minute = selectedDay.getMinutes();
second = selectedDay.getSeconds();
var secondUse = second + 2; // console.log(secondUse)

var dates = new Date(year, month, date, hour, minute, secondUse);
var theDate;
var compare = selectedDay.toJSON();
var comparing = compare.substr(0, 16);
exports.comparing = comparing;
console.log(comparing);

var j = _nodeSchedule["default"].scheduleJob('* * * * * *', function _callee2() {
  var getEntries, _loop, i, j, _ret;

  return _regenerator["default"].async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _regenerator["default"].awrap(_database["default"].query("SELECT date FROM messages"));

        case 3:
          getEntries = _context3.sent;
          theDate = getEntries.rows; // console.log(theDate)

          _loop = function _loop(i) {
            var getData;
            return _regenerator["default"].async(function _loop$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return _regenerator["default"].awrap(_database["default"].query("SELECT * FROM messages WHERE date=$1", [comparing]));

                  case 2:
                    getData = _context2.sent;

                    if (getData.rows[0]) {
                      _context2.next = 7;
                      break;
                    }

                    return _context2.abrupt("return", {
                      v: console.log('no match')
                    });

                  case 7:
                    if (!(getData.rows[0].sent === true)) {
                      _context2.next = 9;
                      break;
                    }

                    return _context2.abrupt("return", {
                      v: console.log('message already sent')
                    });

                  case 9:
                    ;

                    if (theDate[i].date === comparing) {
                      // if(comparing === date.date) {
                      // console.log('here oooooooo')
                      j = _nodeSchedule["default"].scheduleJob(dates, function _callee() {
                        var mailOptions;
                        return _regenerator["default"].async(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                mailOptions = {
                                  from: 'damilolaibrahim77@gmail.com',
                                  to: "".concat(getData.rows[0].receiver_emails[0]),
                                  subject: "".concat(getData.rows[0].subject),
                                  html: "<p>".concat(getData.rows[0].message, "</p>\n                <div style=\"margin-top: 3em\">\n                <p>Regards</p>\n                <p>").concat(getData.rows[0].name, "</p>\n                ").concat(getData.rows[0].sender_email, "</div>")
                                }; // send mail

                                _mailer["default"].sendMail(mailOptions, function (error, info) {
                                  if (error) {
                                    return console.log('an error', error);
                                  }

                                  console.log('message sent', info);
                                });

                                _context.next = 4;
                                return _regenerator["default"].awrap(_database["default"].query("UPDATE messages SET sent=$1 WHERE id=$2", [true, getData.rows[0].id]));

                              case 4:
                                console.log('here oooooooo');

                              case 5:
                              case "end":
                                return _context.stop();
                            }
                          }
                        });
                      });
                    }

                  case 11:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          };

          i = 0;

        case 7:
          if (!(i < theDate.length)) {
            _context3.next = 16;
            break;
          }

          _context3.next = 10;
          return _regenerator["default"].awrap(_loop(i));

        case 10:
          _ret = _context3.sent;

          if (!((0, _typeof2["default"])(_ret) === "object")) {
            _context3.next = 13;
            break;
          }

          return _context3.abrupt("return", _ret.v);

        case 13:
          i++;
          _context3.next = 7;
          break;

        case 16:
          _context3.next = 21;
          break;

        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 21:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 18]]);
});