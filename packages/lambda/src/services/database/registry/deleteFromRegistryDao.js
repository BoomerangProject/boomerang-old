import dynamoDb from "../DynamoDbService";

const deleteFromRegistry = async function(businessAddressArg, userAddressArg) {

  return new Promise(function(resolve, reject) {

    const params = {

      TableName: "BoomerangRegistry",
      Key: {

        businessAddress: businessAddressArg,
        userAddress: userAddressArg
      }
    };

    return dynamoDb.delete(params, function(err, data) {

      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  })
};

export default deleteFromRegistry;