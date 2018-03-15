"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DynamoDbService = require("./DynamoDbService");

var _DynamoDbService2 = _interopRequireDefault(_DynamoDbService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const getNonceForAddingUserToRegistry = (() => {
  var _ref = _asyncToGenerator(function* (businessAddressArg) {

    return new Promise(function (resolve, reject) {

      const params = {

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
    });
  });

  return function getNonceForAddingUserToRegistry(_x) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = getNonceForAddingUserToRegistry;