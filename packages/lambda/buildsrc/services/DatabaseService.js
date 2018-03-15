"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("aws-sdk/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_index2.default.config.update({
  region: "us-east-1",
  endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

const documentClient = new _index2.default.DynamoDB.DocumentClient();

const uuidV4 = require('uuid/v4');

const database = {

  addPendingReview: (userAddressArg, experienceMetadataArg) => {

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

    documentClient.put(params, function (err, data) {

      if (err) {
        throw err;
      }
    });
  }

};

exports.default = database;