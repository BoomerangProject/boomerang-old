'use strict';
import IPFS from "ipfs-mini";
import AWS from "aws-sdk";
import { isAddress } from "../utils";

export default async (event, context, callback) => {

  const ipfsObject = await getIpfsObjectFromRequest(event, callback);
  const ipfsHash = await storeToIpfs(ipfsObject, event, callback);
  await storeToS3(ipfsObject, ipfsHash, event, callback);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `success, pinned ${ipfsHash}`,
      input: event,
    })
  };

  return callback(null, response);
};

let getIpfsObjectFromRequest = async (event, callback) => {

  let queryStringParameters = event["queryStringParameters"];

  if (!queryStringParameters) {
    queryStringParameters = [];
  }

  const userAddress = queryStringParameters["userAddress"].replaceAll('"', '');
  const businessAddress = queryStringParameters["businessAddress"].replaceAll('"', '');
  const businessRating = queryStringParameters["businessRating"].replaceAll('"', '');
  const businessReviewText = queryStringParameters["businessReviewText"].replaceAll('"', '');
  const workerAddress = queryStringParameters["workerAddress"].replaceAll('"', '');
  const workerRating = queryStringParameters["workerRating"].replaceAll('"', '');
  const workerReviewText = queryStringParameters["workerReviewText"].replaceAll('"', '');

  let errorMessage = [];
  
  var missingFieldErrorMessage = getMissingFieldErrorMessage(userAddress, businessAddress, businessRating, workerAddress, workerRating);
  if (missingFieldErrorMessage) {
    errorMessage.push(missingFieldErrorMessage);
  }

  var badEthereumAddressErrorMessage = getBadEthereumAddressErrorMessage(userAddress, businessAddress, workerAddress);
  if (badEthereumAddressErrorMessage) {
    errorMessage.push(badEthereumAddressErrorMessage);
  }

  var badRatingValueErrorMessage = getBadRatingValueErrorMessage(businessRating, workerRating);
  if (badRatingValueErrorMessage) {
    errorMessage.push(badRatingValueErrorMessage);
  }

  // return error
  if (errorMessage.length > 0) {
    
    const response = {
      statusCode: 400,
      body: JSON.stringify({
        message: errorMessage.join(" ").trim(),
        input: event,
      })
    };

    return callback(null, response);
  }

  const ipfsObject = {
    userAddress: userAddress,
    businessAddress: businessAddress,
    businessRating: Number(businessRating),
    businessReviewText: businessReviewText,
    workerAddress: workerAddress,
    workerRating: Number(workerRating),
    workerReviewText: workerReviewText
  };

  return ipfsObject;
};

let getMissingFieldErrorMessage = (userAddress, businessAddress, businessRating, workerAddress, workerRating) => {

  let missingFields = [];

  if (!userAddress) {
    missingFields.push("userAddress");
  }
  if (!businessAddress) {
    missingFields.push("businessAddress");
  }
  if (!businessRating) {
    missingFields.push("businessRating");
  }
  if (!workerAddress) {
    missingFields.push("workerAddress");
  }
  if (!workerRating) {
    missingFields.push("workerRating");
  }

  if (missingFields.length > 0) {
    return(`The following required fields are missing: [${missingFields.join(", ")}].`);
  }
};

let getBadEthereumAddressErrorMessage = (userAddress, businessAddress, workerAddress) => {

  let badAddresses = [];

  if (userAddress && !isAddress(userAddress)) {
    badAddresses.push("userAddress");
  }

  if (businessAddress && !isAddress(businessAddress.toString())) {
    badAddresses.push("businessAddress");
  }

  if (workerAddress && !isAddress(workerAddress.toString())) {
    badAddresses.push("workerAddress");
  }

  if (badAddresses.length > 0) {
    return(`The following ethereum addresses are not valid: [${badAddresses.join(", ")}].`);
  }
};

let getBadRatingValueErrorMessage = (businessRating, workerRating) => {

  let badRatings = [];

  if (businessRating && (businessRating < 1 || businessRating > 5)) {
    badRatings.push("businessRating");
  }

  if (workerRating && (workerRating < 1 || workerRating > 5)) {
    badRatings.push("workerRating");
  }

  if (badRatings.length > 0) {
    return(`Ratings must be 1, 2, 3, 4 or 5. The following ratings are not valid: [${badRatings.join(", ")}].`);
  }
};

let storeToIpfs = async (ipfsObject, event, callback) => {

  let storeToIpfsPromise;

  try {

    const ipfs = new IPFS({ host: 'ec2-34-239-123-139.compute-1.amazonaws.com', port: 5001, protocol: 'http' });

    storeToIpfsPromise = new Promise(function(resolve, reject) {

      ipfs.addJSON(ipfsObject, (error, result) => {

        if (error) {
          return reject(error);
        }

        resolve(result);
      });
    });

  } catch (error) {

    const response = {
      statusCode: 500,
      body: JSON.stringify({
        message: `Unable to store experience on ipfs node. error: ${error}`,
        input: event,
      })
    };

    return callback(null, response);
  }

  return storeToIpfsPromise;
};


let storeToS3 = async (ipfsObject, ipfsHash, event, callback) => {

  let storeToS3Promise;

  try {

    storeToS3Promise = new Promise(function(resolve, reject) {

      const s3 = new AWS.S3();

      const params = {
        Bucket : "kudos-experiences",
        Key : ipfsHash,
        Body : JSON.stringify(ipfsObject)
      };

      s3.putObject(params, function(error, data) {

        if (error) {
          return reject(error);
        }

        resolve(data);
      });

    });

  } catch (error) {

    const response = {
      statusCode: 500,
      body: JSON.stringify({
        message: `Unable to store experience on S3. error: ${error}`,
        input: event,
      })
    };

    return callback(null, response);
  }

  return storeToS3Promise;
};