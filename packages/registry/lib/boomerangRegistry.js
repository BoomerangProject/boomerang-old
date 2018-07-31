"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getNonce = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(businessAddressArg) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new _promise2.default(function (resolve, reject) {

              return axios.get('/getNonceForUpdatingRegistry', {

                params: {
                  businessAddress: businessAddressArg
                }

              }).then(function (response) {

                var nonceValue = response.data.nonce;
                return resolve(nonceValue);
              }).catch(function (error) {
                return reject(error);
              });
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getNonce(_x4) {
    return _ref2.apply(this, arguments);
  };
}();

var updateRegistry = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(businessAddressArg, userAddressArg, userIdArg, signatureArg) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", new _promise2.default(function (resolve, reject) {

              return axios.post('/updateRegistry', {

                businessAddress: businessAddressArg,
                userAddress: userAddressArg,
                userId: userIdArg,
                signature: signatureArg

              }).then(function (response) {

                return resolve(response);
              }).catch(function (error) {
                return reject(error);
              });
            }));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function updateRegistry(_x5, _x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

var _ethereumjsUtil = require("ethereumjs-util");

var _ethereumjsUtil2 = _interopRequireDefault(_ethereumjsUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axios = require("axios");
axios.defaults.baseURL = 'https://k8ariy4jr4.execute-api.us-east-1.amazonaws.com/dev';
// axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.timeout = 30000;

var boomerangRegistry = {

  update: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(businessAddress, userAddress, userId) {
      var nonceValue, message, messageHash, privateKey, signature, statusCode;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getNonce(businessAddress);

            case 2:
              nonceValue = _context.sent;
              message = _ethereumjsUtil2.default.toBuffer(nonceValue);
              messageHash = _ethereumjsUtil2.default.hashPersonalMessage(message);
              privateKey = new Buffer(process.env.BOOMERANG_ACCOUNT_SEED, 'hex');
              signature = _ethereumjsUtil2.default.ecsign(messageHash, privateKey);
              _context.next = 9;
              return updateRegistry(businessAddress, userAddress, userId, signature);

            case 9:
              statusCode = _context.sent;
              return _context.abrupt("return", statusCode);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    function update(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    }

    return update;
  }()
};

module.exports = boomerangRegistry;