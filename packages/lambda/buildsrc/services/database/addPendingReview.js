"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DynamoDbService = require("./DynamoDbService");

var _DynamoDbService2 = _interopRequireDefault(_DynamoDbService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const uuidV4 = require('uuid/v4');


const addPendingReview = (() => {
  var _ref = _asyncToGenerator(function* (userAddressArg, experienceMetadataArg) {

    const params = {

      TableName: "PendingReviews",
      Item: {

        uuid: uuidV4(),
        userAddress: userAddressArg,
        workerAddress: String(undefined),
        businessAddress: String(undefined),
        experienceMetadata: experienceMetadataArg
      }
    };

    _DynamoDbService2.default.put(params, function (err, data) {

      if (err) {
        throw err;
      }
    });
  });

  return function addPendingReview(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = addPendingReview;