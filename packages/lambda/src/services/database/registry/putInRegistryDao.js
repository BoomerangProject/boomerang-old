import dynamoDb from "../DynamoDbService";

const putInRegistry = async function(businessAddressArg, userAddressArg, userIdArg) {

  const params = {

    TableName: "KudosRegistry",
    Item: {

      businessAddress: businessAddressArg,
      userAddress: userAddressArg,
      userId: userIdArg
    }
  };

  dynamoDb.put(params, function(err, data) {

    if (err) {
      throw err;
    }
  });
};

export default putInRegistry;