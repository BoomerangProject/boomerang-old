'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ipfsMini = require("ipfs-mini");

var _ipfsMini2 = _interopRequireDefault(_ipfsMini);

var _awsSdk = require("aws-sdk");

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (event, context, callback) {

    const ipfsObject = yield getIpfsObjectFromRequest(event, callback);
    const ipfsHash = yield storeToIpfs(ipfsObject);
    const success = yield storeToS3(ipfsObject, ipfsHash);

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: `success, pinned ${ipfsHash}`,
        input: event
      })
    };

    callback(null, response);
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

let getIpfsObjectFromRequest = (() => {
  var _ref2 = _asyncToGenerator(function* (event, callback) {

    let queryStringParameters = event["queryStringParameters"];

    if (!queryStringParameters) {
      queryStringParameters = [];
    }

    const userAddress = queryStringParameters["userAddress"];
    const businessAddress = queryStringParameters["businessAddress"];
    const businessRating = queryStringParameters["businessRating"];
    const businessReviewText = queryStringParameters["businessReviewText"];
    const workerAddress = queryStringParameters["workerAddress"];
    const workerRating = queryStringParameters["workerRating"];
    const workerReviewText = queryStringParameters["workerReviewText"];

    let missingFields = [];

    if (!userAddress) {
      missingFields.push("userAddress");
    }
    if (!businessAddress) {
      missingFields.push("businessAddress");
    }
    if (!businessRating) {
      missingFields.push("businessRating");
    }
    if (!workerAddress) {
      missingFields.push("workerAddress");
    }
    if (!workerRating) {
      missingFields.push("workerRating");
    }

    if (missingFields.length > 0) {

      const errorMessage = `the following required fields are missing: [${missingFields.join(", ")}]`;

      const response = {
        statusCode: 400,
        body: JSON.stringify({
          message: errorMessage,
          input: event
        })
      };

      callback(null, response);
    }

    const ipfsObject = {
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

  return function getIpfsObjectFromRequest(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
})();

let storeToIpfs = (() => {
  var _ref3 = _asyncToGenerator(function* (ipfsObject) {

    const ipfs = new _ipfsMini2.default({ host: 'ec2-34-239-123-139.compute-1.amazonaws.com', port: 5001, protocol: 'http' });

    return new Promise(function (resolve, reject) {

      ipfs.addJSON(ipfsObject, (error, result) => {

        if (error) {
          return reject(error);
        }

        resolve(result);
      });
    });
  });

  return function storeToIpfs(_x6) {
    return _ref3.apply(this, arguments);
  };
})();

let storeToS3 = (() => {
  var _ref4 = _asyncToGenerator(function* (ipfsObject, ipfsHash) {

    const s3 = new _awsSdk2.default.S3();

    const params = {
      Bucket: "kudos-experiences",
      Key: ipfsHash,
      Body: ipfsObject
    };

    s3.putObject(params, function (error, data) {

      if (error) {
        console.log(error, error.stack);
      }

      console.log(data);
    });
  });

  return function storeToS3(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
})();