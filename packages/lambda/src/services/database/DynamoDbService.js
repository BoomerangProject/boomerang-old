import AWS from "aws-sdk/index";
AWS.config.update({
  region: "us-east-1",
  endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export default dynamoDb;