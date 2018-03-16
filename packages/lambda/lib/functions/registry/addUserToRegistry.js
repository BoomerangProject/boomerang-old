'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ethereumjsUtil = require("ethereumjs-util");

var _ethereumjsUtil2 = _interopRequireDefault(_ethereumjsUtil);

var _Database = require("../../services/database/Database");

var _Database2 = _interopRequireDefault(_Database);

var _okayResponse = require("../../responses/okayResponse");

var _okayResponse2 = _interopRequireDefault(_okayResponse);

var _invalidSignatureResponse = require("../../responses/invalidSignatureResponse");

var _invalidSignatureResponse2 = _interopRequireDefault(_invalidSignatureResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Web3Utils = require('web3-utils');
var soliditySha3 = Web3Utils.soliditySha3;

//TODO make user send hash that is the userId signed with the business's private key

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event, context, callback) {
    var businessAddress, nonceValue, message, messageHash, signature, publicKey, sender, address, userId, userAddress;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            businessAddress = event.queryStringParameters.businessAddress;
            _context.next = 3;
            return _Database2.default.getNonceForAddingUserToRegistry(businessAddress);

          case 3:
            nonceValue = _context.sent;
            message = _ethereumjsUtil2.default.toBuffer(nonceValue);
            messageHash = _ethereumjsUtil2.default.hashPersonalMessage(message);
            signature = getSignature(event);


            console.log(signature);

            publicKey = _ethereumjsUtil2.default.ecrecover(messageHash, signature.v, signature.r, signature.s);
            sender = _ethereumjsUtil2.default.publicToAddress(publicKey);
            address = _ethereumjsUtil2.default.bufferToHex(sender);

            if (!(address !== businessAddress)) {
              _context.next = 14;
              break;
            }

            callback(null, _invalidSignatureResponse2.default);
            return _context.abrupt("return");

          case 14:
            userId = event.queryStringParameters.userId;
            userAddress = event.queryStringParameters.userAddress;


            callback(null, _okayResponse2.default);

          case 17:
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

var getSignature = function getSignature(event) {

  return JSON.parse(event.body);
};