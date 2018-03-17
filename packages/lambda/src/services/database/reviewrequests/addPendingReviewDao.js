const uuidV4 = require('uuid/v4');
import dynamoDb from "../DynamoDbService";

const addPendingReview = async function(userAddressArg, experienceMetadataArg) {

  return new Promise(function(resolve, reject) {

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

    return dynamoDb.put(params, function(err, data) {

      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });

};

export default addPendingReview;