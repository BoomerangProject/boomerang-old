"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DynamoDbService = require("./DynamoDbService");

var _DynamoDbService2 = _interopRequireDefault(_DynamoDbService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getNonceForAddingUserToRegistry = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(businessAddressArg) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {

              var params = {

                AttributesToGet: ["nonce"],
                TableName: "NonceForAddingUserToRegistry",
                Key: { businessAddress: businessAddressArg }
              };

              return _DynamoDbService2.default.get(params, function (error, data) {

                if (error) {
                  return reject(error);
                }

                if (data.Item == null || data.Item.nonce == null) {
                  return resolve(0);
                }

                return resolve(data.Item.nonce);
              });
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getNonceForAddingUserToRegistry(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = getNonceForAddingUserToRegistry;