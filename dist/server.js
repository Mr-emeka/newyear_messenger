"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _nodeCron = _interopRequireDefault(require("node-cron"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _nodeSchedule = _interopRequireDefault(require("node-schedule"));

var _path = _interopRequireDefault(require("path"));

var _cors = _interopRequireDefault(require("cors"));

var _response = _interopRequireDefault(require("./helpers/response"));

var _Message = _interopRequireDefault(require("./routes/Message.route"));

var _cookieValidator = _interopRequireDefault(require("./middleware/cookieValidator"));

// import session from 'express-session';
// response helper
// routers
//welcome route
// import welcomeRoute from './routes/welcome.route';
// message route
// Configure .env
_dotenv["default"].config();

var app = (0, _express["default"])(); //cors

app.use((0, _cors["default"])()); //ejs

app.set('views', _path["default"].join(__dirname, 'views'));
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.use((0, _morgan["default"])('dev'));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _cookieParser["default"])());
var PORT = process.env.PORT || 4000;
app.get('/', _cookieValidator["default"], function (req, res) {
  res.status(200).render("index");
});
app.use('/api/v1', _Message["default"]);
app.use('*', function (req, res) {
  res.render('error');

  _response["default"].error(res, 'error', 404, 'incorrect route');
});
app.listen(PORT, function () {
  console.log("Server runing on PORT ".concat(PORT, " visit http://localhost:").concat(PORT));
}); // To enable test

var _default = app;
exports["default"] = _default;