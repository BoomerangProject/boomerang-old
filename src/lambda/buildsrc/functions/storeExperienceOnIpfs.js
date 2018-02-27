'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ipfsMini = require("ipfs-mini");

var _ipfsMini2 = _interopRequireDefault(_ipfsMini);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let getIpfsObjectFromRequest = (() => {
  var _ref = _asyncToGenerator(function* (event) {

    var queryStringParameters = event["queryStringParameters"];

    var userAddress = queryStringParameters["userAddress"];

    var businessAddress = queryStringParameters["businessAddress"];
    var businessRating = queryStringParameters["businessRating"];
    var businessReviewText = queryStringParameters["businessReviewText"];
    var workerAddress = queryStringParameters["workerAddress"];
    var workerRating = queryStringParameters["workerRating"];
    var workerReviewText = queryStringParameters["workerReviewText"];

    var ipfsObject = {
      userAddress: userAddress,
      businessAddress: businessAddress,
      businessRating: Number(businessRating),
      businessReviewText: businessReviewText,
      workerAddress: workerAddress,
      workerRating: Number(workerRating),
      workerReviewText: workerReviewText
    };

    return ipfsObject;
  });

  return function getIpfsObjectFromRequest(_x) {
    return _ref.apply(this, arguments);
  };
})();

let storeToIpfs = (() => {
  var _ref2 = _asyncToGenerator(function* (ipfsObject) {

    const ipfs = new _ipfsMini2.default({ host: 'ec2-34-239-123-139.compute-1.amazonaws.com', port: 5001, protocol: 'http' });

    var ipfsHash;

    yield ipfs.addJSON(ipfsObject, function (err, result) {
      console.log(err, result);
      ipfsHash = result;
    });

    return ipfsHash;
  });

  return function storeToIpfs(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

exports.default = (() => {
  var _ref3 = _asyncToGenerator(function* (event, context, callback) {

    const ipfsObject = yield getIpfsObjectFromRequest(event);
    const ipfsHash = yield storeToIpfs(ipfsObject);

    console.log(ipfsHash);

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: `success`,
        input: event
      })
    };

    callback(null, response);
  });

  return function (_x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
})();