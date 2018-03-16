"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DynamoDbService = require("./DynamoDbService");

var _DynamoDbService2 = _interopRequireDefault(_DynamoDbService);

var _getNonceForAddingUserToRegistry = require("./getNonceForAddingUserToRegistry");

var _getNonceForAddingUserToRegistry2 = _interopRequireDefault(_getNonceForAddingUserToRegistry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var incrementNonceForAddingUserToRegistry = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(businessAddressArg) {
    var nonceValue;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getNonceForAddingUserToRegistry2.default)(businessAddressArg);

          case 2:
            nonceValue = _context.sent;
            _context.next = 5;
            return putItem(businessAddressArg, nonceValue + 1);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function incrementNonceForAddingUserToRegistry(_x) {
    return _ref.apply(this, arguments);
  };
}();

var putItem = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(businessAddressArg, nonceArg) {
    var params;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            params = {

              TableName: "NonceForAddingUserToRegistry",
              Item: {

                businessAddress: businessAddressArg,
                nonce: nonceArg
              }
            };


            _DynamoDbService2.default.put(params, function (err, data) {

              if (err) {
                throw err;
              }
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function putItem(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = incrementNonceForAddingUserToRegistry;