"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

//declare variables
var date = document.querySelector('.date');
var name = document.querySelector('.name');
var subject = document.querySelector('.subject');
var senderEmail = document.querySelector('.senderemail');
var receiversEmail = document.querySelector('.receiveremail');
var message = document.querySelector('.message');
var btn = document.querySelector("#submit"); // validation
// error tags

var dateErr = document.querySelector('.date-error');
var nameErr = document.querySelector('.name-error');
var subjectErr = document.querySelector('.subject-error');
var senderEmailErr = document.querySelector('.send-email-error');
var receiversEmailErr = document.querySelector('.rec-email-error');
var messageErr = document.querySelector('.msg-error'); // refactor this

name.addEventListener('blur', function () {
  if (name.value.length < 3) {
    nameErr.style.display = 'block';
  } else {
    nameErr.style.display = 'none';
  }
});
subject.addEventListener('blur', function () {
  if (!subject.value) {
    subjectErr.style.display = 'block';
  } else {
    subjectErr.style.display = 'none';
  }
});
senderEmail.addEventListener('blur', function () {
  if (!/[\w]+@[a-zA-Z]+\.[a-zA-Z]{2}/.test(senderEmail.value)) {
    senderEmailErr.style.display = 'block';
  } else {
    senderEmailErr.style.display = 'none';
  }
});
receiversEmail.addEventListener('blur', function () {
  if (!/[\w]+@[a-zA-Z]+\.[a-zA-Z]{2}/.test(receiversEmail.value)) {
    receiversEmailErr.style.display = 'block';
  } else {
    receiversEmailErr.style.display = 'none';
  }
});
message.addEventListener('blur', function () {
  if (!message.value) {
    messageErr.style.display = 'block';
  } else {
    messageErr.style.display = 'none';
  }
}); // refactor o
//modal

var modal = document.querySelector('.modal');
var messageModal = document.querySelector('.message-modal');
var cancel = document.querySelector('.cancel'); // send request

btn.addEventListener('click', function _callee(e) {
  var body, response;
  return _regenerator["default"].async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          e.preventDefault();
          body = {
            name: name.value,
            subject: subject.value,
            senderEmail: senderEmail.value,
            message: message.value,
            receiversEmail: receiversEmail.value,
            date: date.value
          };
          _context.next = 4;
          return _regenerator["default"].awrap(fetch('/api/v1/create', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json"
            }
          }).then(function (res) {
            return res.json();
          })["catch"](function (e) {
            return console.log(e);
          }));

        case 4:
          response = _context.sent;
          console.log(response);

          if (response.message === 'entries should all be filled') {
            modal.style.display = 'block';
            messageModal.textContent = 'fill all fields';
          }

          if (response.status === 'success') {
            modal.style.display = 'block';
            messageModal.textContent = 'message saved. your scheduled mail will be sent';
          }

          if (response.message === 'back date') {
            dateErr.style.display = 'block';
          } else {
            dateErr.style.display = 'none';
          }

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
});
cancel.addEventListener('click', function () {
  modal.style.display = 'none';
});