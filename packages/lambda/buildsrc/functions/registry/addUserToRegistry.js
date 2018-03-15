'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ethereumjsUtil = require('ethereumjs-util');

var _ethereumjsUtil2 = _interopRequireDefault(_ethereumjsUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Web3Utils = require('web3-utils');
const soliditySha3 = Web3Utils.soliditySha3;

//TODO make user send hash that is the userId signed with the business's private key

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (event, context, callback) {

    // get nonce to sign

    // sign the none and 


    const data = '1';
    const message = _ethereumjsUtil2.default.toBuffer(data);
    const messageHash = _ethereumjsUtil2.default.hashPersonalMessage(message);

    const privateKey = new Buffer("a62d1306d2f88e6a9e5adf5b8a632d5026019bfb450c009886dba13e9ed357aa", "hex");
    const signature = _ethereumjsUtil2.default.ecsign(messageHash, privateKey);
    const publicKey = _ethereumjsUtil2.default.ecrecover(messageHash, signature.v, signature.r, signature.s);
    const sender = _ethereumjsUtil2.default.publicToAddress(publicKey);
    const addr = _ethereumjsUtil2.default.bufferToHex(sender);
    //


    console.log(addr);

    const queryStringParameters = event.queryStringParameters;

    const userId = queryStringParameters.userId;
    const businessAddress = queryStringParameters.businessAddress;

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: `it will be success`,
        input: event
      })
    };

    callback(null, response);
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();