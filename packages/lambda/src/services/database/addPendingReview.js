const uuidV4 = require('uuid/v4');
import dynamoDb from "./DynamoDbService";

const addPendingReview = async function(userAddressArg, experienceMetadataArg) {

  const params = {

    TableName: "PendingReviews",
    Item: {

      uuid: uuidV4(),
      userAddress: userAddressArg,
      workerAddress: String(undefined),
      businessAddress: String(undefined),
      experienceMetadata: experienceMetadataArg
    }
  };

  dynamoDb.put(params, function(err, data) {

    if (err) {
      throw err;
    }
  });
};

export default addPendingReview;