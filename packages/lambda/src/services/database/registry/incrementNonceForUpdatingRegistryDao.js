import dynamoDb from "../DynamoDbService";
import getNonceForAddingUserToRegistry from "./getNonceForUpdatingRegistryDao";


const incrementNonceForUpatingRegistry = async function(businessAddressArg) {

  const nonceValue = await getNonceForAddingUserToRegistry(businessAddressArg);
  await putItem(businessAddressArg, nonceValue+1);
};

const putItem = async function(businessAddressArg, nonceArg) {

  return new Promise(function(resolve, reject) {

    const params = {

      TableName: "NonceForUpdatingRegistry",
      Item: {

        businessAddress: businessAddressArg,
        nonce: nonceArg
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

export default incrementNonceForUpatingRegistry;