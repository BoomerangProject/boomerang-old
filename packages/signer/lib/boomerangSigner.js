"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getNonceValueForNewRating = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(businessAddressArg, userAddressArg) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", new _promise2.default(function () {
              var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(resolve, reject) {
                var axiosClient;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return _axios2.default.create({
                          baseURL: 'https://z6iwp9j5e3.execute-api.us-east-1.amazonaws.com/dev'
                        });

                      case 2:
                        axiosClient = _context2.sent;


                        axiosClient.get('/getNonceValueForNewRating', {

                          params: {
                            businessAddress: businessAddressArg,
                            userAddress: userAddressArg
                          }
                        }).then(function (response) {
                          return resolve(response.data.nonce);
                        }).catch(function (error) {
                          console.log('error getting nonce for new rating: ' + error);
                          return reject(error);
                        });

                      case 4:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, this);
              }));

              return function (_x5, _x6) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getNonceValueForNewRating(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var _ethereumjsUtil = require("ethereumjs-util");

var _ethereumjsUtil2 = _interopRequireDefault(_ethereumjsUtil);

var _ethereumjsAbi = require("ethereumjs-abi");

var _ethereumjsAbi2 = _interopRequireDefault(_ethereumjsAbi);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var privateKeyOfTheBusiness = '2413fffb1c65c4da92322c52e1b609c2f69b19e14cb178ec06d8ee63dc622f73';
// const privateKey = new Buffer(process.env.BOOMERANG_ACCOUNT_SEED, 'hex');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

var boomerangSigner = {

  getSignature: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(businessAddress, userAddress) {
      var nonceValue, message, messageHash, privateKey, signature, recoveredAddress;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:

              console.log('businessAddress: ' + businessAddress);
              console.log('userAddress: ' + userAddress);

              _context.next = 4;
              return getNonceValueForNewRating(businessAddress, userAddress);

            case 4:
              nonceValue = _context.sent;

              console.log('nonceValue: ' + nonceValue);

              message = _ethereumjsAbi2.default.soliditySHA3(['address', 'uint256'], [userAddress, nonceValue]);

              console.log('message: ' + _ethereumjsUtil2.default.bufferToHex(message));

              // adds the "x19Ethereum Signed Message:\n32" prefix
              messageHash = _ethereumjsUtil2.default.hashPersonalMessage(message);

              console.log('messageHash: ' + _ethereumjsUtil2.default.bufferToHex(messageHash));

              privateKey = new Buffer(privateKeyOfTheBusiness, 'hex');
              signature = _ethereumjsUtil2.default.ecsign(messageHash, privateKey);
              recoveredAddress = _ethereumjsUtil2.default.publicToAddress(_ethereumjsUtil2.default.ecrecover(messageHash, signature.v, signature.r, signature.s));

              console.log('recovered address: ' + _ethereumjsUtil2.default.bufferToHex(recoveredAddress));

              return _context.abrupt("return", signature);

            case 15:
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