'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _awsSdk = require("aws-sdk");

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_awsSdk2.default.config.update({
  region: "us-east-1",
  endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

const docClient = new _awsSdk2.default.DynamoDB.DocumentClient();
const tableName = "ReviewRequests";

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (event, context, callback) {

    const queryStringParameters = event["queryStringParameters"];

    const userAccountAddressArg = queryStringParameters["userAccountAddress"];
    // const userAccountAddressArg = "0x0038b10a573235b10f00b8c4900c664b80dfc62c";

    const reviewRequestMetaDataArg = JSON.parse(event.body);
    console.log(reviewRequestMetaDataArg);

    const params = {

      TableName: tableName,
      Item: {

        userAccountAddress: userAccountAddressArg,
        reviewRequestMetaData: reviewRequestMetaDataArg
      }
    };

    docClient.put(params, function (err, data) {

      if (err) {
        throw err;
      }

      console.log("added item:", JSON.stringify(data, null, 2));
    });

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: `success`,
        input: event
      })
    };

    callback(null, response);
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();