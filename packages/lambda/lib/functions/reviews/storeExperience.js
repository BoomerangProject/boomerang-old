'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ipfsMini = require("ipfs-mini");

var _ipfsMini2 = _interopRequireDefault(_ipfsMini);

var _awsSdk = require("aws-sdk");

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event, context, callback) {
    var ipfsObject, ipfsHash, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getIpfsObjectFromRequest(event, callback);

          case 2:
            ipfsObject = _context.sent;
            _context.next = 5;
            return storeToIpfs(ipfsObject, event, callback);

          case 5:
            ipfsHash = _context.sent;
            _context.next = 8;
            return storeToS3(ipfsObject, ipfsHash, event, callback);

          case 8:
            response = {
              statusCode: 200,
              body: JSON.stringify({
                message: "success, pinned " + ipfsHash,
                input: event
              })
            };
            return _context.abrupt("return", callback(null, response));

          case 10:
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

var getIpfsObjectFromRequest = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(event, callback) {
    var queryStringParameters, userAddress, businessAddress, businessRating, businessReviewText, workerAddress, workerRating, workerReviewText, errorMessage, missingFieldErrorMessage, badEthereumAddressErrorMessage, badRatingValueErrorMessage, response, ipfsObject;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            queryStringParameters = event.queryStringParameters;


            if (!queryStringParameters) {
              queryStringParameters = [];
            }

            userAddress = queryStringParameters["userAddress"].replaceAll('"', '');
            businessAddress = queryStringParameters["businessAddress"].replaceAll('"', '');
            businessRating = queryStringParameters["businessRating"].replaceAll('"', '');
            businessReviewText = queryStringParameters["businessReviewText"].replaceAll('"', '');
            workerAddress = queryStringParameters["workerAddress"].replaceAll('"', '');
            workerRating = queryStringParameters["workerRating"].replaceAll('"', '');
            workerReviewText = queryStringParameters["workerReviewText"].replaceAll('"', '');
            errorMessage = [];
            missingFieldErrorMessage = getMissingFieldErrorMessage(userAddress, businessAddress, businessRating, workerAddress, workerRating);

            if (missingFieldErrorMessage) {
              errorMessage.push(missingFieldErrorMessage);
            }

            badEthereumAddressErrorMessage = getBadEthereumAddressErrorMessage(userAddress, businessAddress, workerAddress);

            if (badEthereumAddressErrorMessage) {
              errorMessage.push(badEthereumAddressErrorMessage);
            }

            badRatingValueErrorMessage = getBadRatingValueErrorMessage(businessRating, workerRating);

            if (badRatingValueErrorMessage) {
              errorMessage.push(badRatingValueErrorMessage);
            }

            // return error

            if (!(errorMessage.length > 0)) {
              _context2.next = 19;
              break;
            }

            response = {
              statusCode: 400,
              body: JSON.stringify({
                message: errorMessage.join(" ").trim(),
                input: event
              })
            };
            return _context2.abrupt("return", callback(null, response));

          case 19:
            ipfsObject = {
              userAddress: userAddress,
              businessAddress: businessAddress,
              businessRating: Number(businessRating),
              businessReviewText: businessReviewText,
              workerAddress: workerAddress,
              workerRating: Number(workerRating),
              workerReviewText: workerReviewText
            };
            return _context2.abrupt("return", ipfsObject);

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getIpfsObjectFromRequest(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var getMissingFieldErrorMessage = function getMissingFieldErrorMessage(userAddress, businessAddress, businessRating, workerAddress, workerRating) {

  var missingFields = [];

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
    return "The following required fields are missing: [" + missingFields.join(", ") + "].";
  }
};

var getBadEthereumAddressErrorMessage = function getBadEthereumAddressErrorMessage(userAddress, businessAddress, workerAddress) {

  var badAddresses = [];

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
    return "The following ethereum addresses are not valid: [" + badAddresses.join(", ") + "].";
  }
};

var getBadRatingValueErrorMessage = function getBadRatingValueErrorMessage(businessRating, workerRating) {

  var badRatings = [];

  if (businessRating && (businessRating < 1 || businessRating > 5)) {
    badRatings.push("businessRating");
  }

  if (workerRating && (workerRating < 1 || workerRating > 5)) {
    badRatings.push("workerRating");
  }

  if (badRatings.length > 0) {
    return "Ratings must be 1, 2, 3, 4 or 5. The following ratings are not valid: [" + badRatings.join(", ") + "].";
  }
};

var storeToIpfs = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ipfsObject, event, callback) {
    var storeToIpfsPromise, ipfs, response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            storeToIpfsPromise = void 0;
            _context3.prev = 1;
            ipfs = new _ipfsMini2.default({ host: 'ec2-34-239-123-139.compute-1.amazonaws.com', port: 5001, protocol: 'http' });


            storeToIpfsPromise = new Promise(function (resolve, reject) {

              ipfs.addJSON(ipfsObject, function (error, result) {

                if (error) {
                  return reject(error);
                }

                resolve(result);
              });
            });

            _context3.next = 10;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](1);
            response = {
              statusCode: 500,
              body: JSON.stringify({
                message: "Unable to store experience on ipfs node. error: " + _context3.t0,
                input: event
              })
            };
            return _context3.abrupt("return", callback(null, response));

          case 10:
            return _context3.abrupt("return", storeToIpfsPromise);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 6]]);
  }));

  return function storeToIpfs(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

var storeToS3 = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ipfsObject, ipfsHash, event, callback) {
    var storeToS3Promise, response;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            storeToS3Promise = void 0;
            _context4.prev = 1;


            storeToS3Promise = new Promise(function (resolve, reject) {

              var s3 = new _awsSdk2.default.S3();

              var params = {
                Bucket: "kudos-experiences",
                Key: ipfsHash,
                Body: JSON.stringify(ipfsObject)
              };

              s3.putObject(params, function (error, data) {

                if (error) {
                  return reject(error);
                }

                resolve(data);
              });
            });

            _context4.next = 9;
            break;

          case 5:
            _context4.prev = 5;
            _context4.t0 = _context4["catch"](1);
            response = {
              statusCode: 500,
              body: JSON.stringify({
                message: "Unable to store experience on S3. error: " + _context4.t0,
                input: event
              })
            };
            return _context4.abrupt("return", callback(null, response));

          case 9:
            return _context4.abrupt("return", storeToS3Promise);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[1, 5]]);
  }));

  return function storeToS3(_x9, _x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();