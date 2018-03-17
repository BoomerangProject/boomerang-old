import dynamoDb from "../DynamoDbService";

const deleteFromRegistry = async function(businessAddressArg, userIdArg, userAddressArg) {

  const params = {

    TableName: "KudosRegistry",
    Item: {

      businessAddress: businessAddressArg,
      userId: userIdArg,
      userAddress: userAddressArg
    }
  };

  dynamoDb.delete(params, function(err, data) {

    if (err) {
      throw err;
    }
  });
};

export default deleteFromRegistry;