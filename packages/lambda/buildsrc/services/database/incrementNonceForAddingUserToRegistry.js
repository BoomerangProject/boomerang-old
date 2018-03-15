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

const incrementNonceForAddingUserToRegistry = (() => {
  var _ref = _asyncToGenerator(function* (businessAddressArg) {

    const nonceValue = yield (0, _getNonceForAddingUserToRegistry2.default)(businessAddressArg);
    yield putItem(businessAddressArg, nonceValue + 1);
  });

  return function incrementNonceForAddingUserToRegistry(_x) {
    return _ref.apply(this, arguments);
  };
})();

const putItem = (() => {
  var _ref2 = _asyncToGenerator(function* (businessAddressArg, nonceArg) {

    const params = {

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
  });

  return function putItem(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
})();

exports.default = incrementNonceForAddingUserToRegistry;