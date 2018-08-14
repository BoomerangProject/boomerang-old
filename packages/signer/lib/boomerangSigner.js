"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getNonceForNewRating = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(businessAddressArg, userAddressArg) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new _promise2.default(function (resolve, reject) {

              return _axios2.default.get('/getNonceForNewRating', {

                params: {
                  businessAddress: businessAddressArg,
                  userAddress: userAddressArg
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

  return function getNonceForNewRating(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var _ethereumjsUtil = require("ethereumjs-util");

var _ethereumjsUtil2 = _interopRequireDefault(_ethereumjsUtil);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_axios2.default.defaults.baseURL = 'https://z6iwp9j5e3.execute-api.us-east-1.amazonaws.com/dev';
// axios.defaults.baseURL = 'http://localhost:3000';


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var boomerangSigner = {

  getSignature: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(businessAddress, userAddress) {
      var nonceValue, message, messageHash, privateKey, signature;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getNonceForNewRating(businessAddress, userAddress);

            case 2:
              nonceValue = _context.sent;

              console.log('nonceValue: ' + nonceValue);
              // const nonceValue = 27031;
              //
              // for (var i = 0; i < 10; i++) {
              //
              //   const value = getRandomInt(0,32000);
              //   console.log(value);
              //
              //   const message = ethUtil.toBuffer(value);
              //   const messageHash = ethUtil.hashPersonalMessage(message);
              //
              //   console.log(messageHash);
              //
              //   const privateKey = new Buffer(process.env.BOOMERANG_ACCOUNT_SEED, 'hex');
              //   const signature = ethUtil.ecsign(messageHash, privateKey);
              //
              //   console.log(signature);
              // }

              message = _ethereumjsUtil2.default.toBuffer(nonceValue);

              console.log("message");
              console.log(message);
              messageHash = _ethereumjsUtil2.default.hashPersonalMessage(message);

              console.log("messageHash");
              console.log(messageHash);
              privateKey = new Buffer(process.env.BOOMERANG_ACCOUNT_SEED, 'hex');
              signature = _ethereumjsUtil2.default.ecsign(messageHash, privateKey);

              // console.log(ethUtil.publicToAddress(ethUtil.ecrecover(messageHash, 27, signature.r, signature.s)));
              // console.log(ethUtil.publicToAddress(ethUtil.ecrecover(messageHash, 28, signature.r, signature.s)));

              return _context.abrupt("return", signature);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    function getSignature(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return getSignature;
  }()
};

module.exports = boomerangSigner;