"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _pg = _interopRequireDefault(require("pg"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config(); // database configuration


var connection = [{
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
}, {
  host: process.env.DB_HOST_TEST,
  database: process.env.DB_DATABASE_TEST,
  user: process.env.DB_USER_TEST,
  password: process.env.DB_PASSWORD_TEST,
  port: process.env.DB_PORT_TEST
}];
var databaseConnection;

if (process.env.NODE_ENV === 'development') {
  databaseConnection = connection[0];
} else {
  databaseConnection = connection[1];
} // instantiate pool


var pool = new _pg["default"].Pool(databaseConnection);
pool.on('connect', function () {});

var messageTable = function messageTable() {
  var query;
  return _regenerator["default"].async(function messageTable$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          query = "CREATE TABLE IF NOT EXISTS \n    messages(\n        id SERIAL PRIMARY KEY UNIQUE,\n        user_id VARCHAR(1500) NOT NULL,\n        name VARCHAR(500) NOT NULL,\n        subject VARCHAR(250) NOT NULL,\n        sender_email VARCHAR(500) NOT NULL,\n        receiver_emails TEXT [] NOT NULL,\n        message VARCHAR(1000000) NOT NULL,\n        date VARCHAR(200) NOT NULL,\n        sent BOOLEAN DEFAULT false\n    )";
          _context.prev = 1;
          _context.next = 4;
          return _regenerator["default"].awrap(pool.query(query));

        case 4:
          console.log('message table created');
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 7]]);
};

messageTable(); // drop data base
// const dropTable = async () => {
//     let table = 'messages'
//     const query = `DROP TABLE IF EXISTS ${table}`
//     try {
//         await pool.query(query);
//         console.log(`${table} dropped`)
//     }
//     catch(e) {
//         console.log(e);
//     }
// }
// dropTable();

var _default = pool;
exports["default"] = _default;