'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ipfsMini = require("ipfs-mini");

var _ipfsMini2 = _interopRequireDefault(_ipfsMini);

var _awsSdk = require("aws-sdk");

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (event, context, callback) {

    const ipfsObject = yield getIpfsObjectFromRequest(event, callback);
    const ipfsHash = yield storeToIpfs(ipfsObject, event, callback);
    // await storeToS3(ipfsObject, ipfsHash, event, callback);

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: `success, pinned ${ipfsHash}`,
        input: event
      })
    };

    return callback(null, response);
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

    const userAddress = queryStringParameters["userAddress"].replaceAll('"', '');
    const businessAddress = queryStringParameters["businessAddress"].replaceAll('"', '');
    const businessRating = queryStringParameters["businessRating"].replaceAll('"', '');
    const businessReviewText = queryStringParameters["businessReviewText"].replaceAll('"', '');
    const workerAddress = queryStringParameters["workerAddress"].replaceAll('"', '');
    const workerRating = queryStringParameters["workerRating"].replaceAll('"', '');
    const workerReviewText = queryStringParameters["workerReviewText"].replaceAll('"', '');

    let errorMessage = [];

    var missingFieldErrorMessage = getMissingFieldErrorMessage(userAddress, businessAddress, businessRating, workerAddress, workerRating);
    if (missingFieldErrorMessage) {
      errorMessage.push(missingFieldErrorMessage);
    }

    var badEthereumAddressErrorMessage = getBadEthereumAddressErrorMessage(userAddress, businessAddress, workerAddress);
    if (badEthereumAddressErrorMessage) {
      errorMessage.push(badEthereumAddressErrorMessage);
    }

    var badRatingValueErrorMessage = getBadRatingValueErrorMessage(businessRating, workerRating);
    if (badRatingValueErrorMessage) {
      errorMessage.push(badRatingValueErrorMessage);
    }

    // return error
    if (errorMessage.length > 0) {

      const response = {
        statusCode: 400,
        body: JSON.stringify({
          message: errorMessage.join(" ").trim(),
          input: event
        })
      };

      return callback(null, response);
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

let getMissingFieldErrorMessage = (userAddress, businessAddress, businessRating, workerAddress, workerRating) => {

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
    return `The following required fields are missing: [${missingFields.join(", ")}].`;
  }
};

let getBadEthereumAddressErrorMessage = (userAddress, businessAddress, workerAddress) => {

  let badAddresses = [];

  if (userAddress && !(0, _utils.isAddress)(userAddress)) {
    badAddresses.push("userAddress");
  }

  if (businessAddress && !(0, _utils.isAddress)(businessAddress.toString())) {
    badAddresses.push("businessAddress");
  }

  if (workerAddress && !(0, _utils.isAddress)(workerAddress.toString())) {
    badAddresses.push("workerAddress");
  }

  if (badAddresses.length > 0) {
    return `The following ethereum addresses are not valid: [${badAddresses.join(", ")}].`;
  }
};

let getBadRatingValueErrorMessage = (businessRating, workerRating) => {

  let badRatings = [];

  if (businessRating && (businessRating < 1 || businessRating > 5)) {
    badRatings.push("businessRating");
  }

  if (workerRating && (workerRating < 1 || workerRating > 5)) {
    badRatings.push("workerRating");
  }

  if (badRatings.length > 0) {
    return `Ratings must be 1, 2, 3, 4 or 5. The following ratings are not valid: [${badRatings.join(", ")}].`;
  }
};

let storeToIpfs = (() => {
  var _ref3 = _asyncToGenerator(function* (ipfsObject, event, callback) {

    let storeToIpfsPromise;

    try {

      const ipfs = new _ipfsMini2.default({ host: 'ec2-34-239-123-139.compute-1.amazonaws.com', port: 5001, protocol: 'http' });

      storeToIpfsPromise = new Promise(function (resolve, reject) {

        ipfs.addJSON(ipfsObject, (error, result) => {

          if (error) {
            return reject(error);
          }

          resolve(result);
        });
      });
    } catch (error) {

      const response = {
        statusCode: 500,
        body: JSON.stringify({
          message: `Unable to store experience on ipfs node. error: ${error}`,
          input: event
        })
      };

      return callback(null, response);
    }

    return storeToIpfsPromise;
  });

  return function storeToIpfs(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
})();

let storeToS3 = (() => {
  var _ref4 = _asyncToGenerator(function* (ipfsObject, ipfsHash, event, callback) {

    let storeToS3Promise;

    try {

      storeToS3Promise = new Promise(function (resolve, reject) {

        const s3 = new _awsSdk2.default.S3();

        const params = {
          Bucket: "kudos-experiences",
          Key: ipfsHash,
          Body: ipfsObject
        };

        s3.putObject(params, function (error, data) {

          if (error) {
            return reject(error);
          }

          resolve(data);
        });
      });
    } catch (error) {

      const response = {
        statusCode: 500,
        body: JSON.stringify({
          message: `Unable to store experience on S3. error: ${error}`,
          input: event
        })
      };

      return callback(null, response);
    }

    return storeToS3Promise;
  });

  return function storeToS3(_x9, _x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
})();