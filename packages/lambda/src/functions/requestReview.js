'use strict';
import AWS from "aws-sdk";

AWS.config.update({
  region: "us-east-1",
  endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = "ReviewRequests";

export default async (event, context, callback) => {

  const queryStringParameters = event["queryStringParameters"];

  const userAccountAddressArg = queryStringParameters["userAccountAddress"];
  // const userAccountAddressArg = "0x0038b10a573235b10f00b8c4900c664b80dfc62c";

  const reviewRequestMetaDataArg = JSON.parse(event.body);
  console.log(reviewRequestMetaDataArg);



  const params = {

    TableName: tableName,
    Item:{

      userAccountAddress: userAccountAddressArg,
      reviewRequestMetaData: reviewRequestMetaDataArg
    }
  };

  docClient.put(params, function(err, data) {

    if (err) {
      throw err;
    }
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `success`,
      input: event,
    })
  };

  callback(null, response);
};

