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

const dynamoDb = new _index2.default.DynamoDB.DocumentClient();

exports.default = dynamoDb;