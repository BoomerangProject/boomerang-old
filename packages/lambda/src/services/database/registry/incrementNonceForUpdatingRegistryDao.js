import dynamoDb from "../DynamoDbService";
import getNonceForAddingUserToRegistry from "./getNonceForUpdatingRegistryDao";


const incrementNonceForUpatingRegistry = async function(businessAddressArg) {

  const nonceValue = await getNonceForAddingUserToRegistry(businessAddressArg);
  await putItem(businessAddressArg, nonceValue+1);
};

const putItem = async function(businessAddressArg, nonceArg) {

  const params = {

    TableName: "NonceForUpdatingRegistry",
    Item: {

      businessAddress: businessAddressArg,
      nonce: nonceArg
    }
  };

  dynamoDb.put(params, function(err, data) {

    if (err) {
      throw err;
    }
  });
};

export default incrementNonceForUpatingRegistry;