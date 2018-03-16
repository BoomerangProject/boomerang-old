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

const Web3Utils = require('web3-utils');
const soliditySha3 = Web3Utils.soliditySha3;

//TODO make user send hash that is the userId signed with the business's private key

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (event, context, callback) {

    const businessAddress = event.queryStringParameters.businessAddress;

    const nonceValue = yield _Database2.default.getNonceForAddingUserToRegistry(businessAddress);

    const message = _ethereumjsUtil2.default.toBuffer(nonceValue);
    const messageHash = _ethereumjsUtil2.default.hashPersonalMessage(message);

    const signature = getSignature(event);

    console.log(signature);

    const publicKey = _ethereumjsUtil2.default.ecrecover(messageHash, signature.v, signature.r, signature.s);
    const sender = _ethereumjsUtil2.default.publicToAddress(publicKey);
    const address = _ethereumjsUtil2.default.bufferToHex(sender);

    if (address !== businessAddress) {
      callback(null, _invalidSignatureResponse2.default);
      return;
    }

    const userId = event.queryStringParameters.userId;
    const userAddress = event.queryStringParameters.userAddress;

    callback(null, _okayResponse2.default);
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

const getSignature = function (event) {

  return JSON.parse(event.body);
};