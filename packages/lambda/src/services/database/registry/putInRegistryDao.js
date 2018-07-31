import dynamoDb from "../DynamoDbService";

const putInRegistry = async function(businessAddressArg, userAddressArg, userIdArg) {

  return new Promise(function(resolve, reject) {

    const params = {

      TableName: "BoomerangRegistry",
      Item: {

        businessAddress: businessAddressArg,
        userAddress: userAddressArg,
        userId: userIdArg
      }
    };

    return dynamoDb.put(params, function(err, data) {

      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
};

export default putInRegistry;