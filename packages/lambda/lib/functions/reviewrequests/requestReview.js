'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Database = require("../../services/database/Database");

var _Database2 = _interopRequireDefault(_Database);

var _okayResponse = require("../../responses/okayResponse");

var _okayResponse2 = _interopRequireDefault(_okayResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var userAddress = function userAddress(event) {

  return event.queryStringParameters.userAddress;
};

var experienceMetadata = function experienceMetadata(event) {

  return JSON.parse(event.body);
};

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event, context, callback) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            _Database2.default.addPendingReview(userAddress(event), experienceMetadata(event));

            _context.next = 3;
            return _Database2.default.incrementNonceForAddingUserToRegistry(event.queryStringParameters.userAddress);

          case 3:

            callback(null, _okayResponse2.default);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();