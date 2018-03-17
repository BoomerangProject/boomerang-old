import dynamoDb from "../DynamoDbService";

const getNonceForUpdatingRegistry = async function(businessAddressArg) {

  return new Promise(function(resolve, reject) {

    const params = {

      AttributesToGet: ["nonce"],
      TableName: "NonceForUpdatingRegistry",
      Key : {businessAddress: businessAddressArg}
    };

    return dynamoDb.get(params, function(error, data) {

      if (error) {
        return reject(error);
      }

      if (data.Item == null || data.Item.nonce == null) {
        return resolve(0);
      }

      return resolve(data.Item.nonce);
    });
  });
};

export default getNonceForUpdatingRegistry;