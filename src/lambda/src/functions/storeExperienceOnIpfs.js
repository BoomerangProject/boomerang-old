'use strict';
import IPFS from "ipfs-mini";
import AWS from "aws-sdk";
const isAddress = require("web3").utils.isAddress;

export default async (event, context, callback) => {

  const ipfsObject = await getIpfsObjectFromRequest(event, callback);
  const ipfsHash = await storeToIpfs(ipfsObject);
  const success = await storeToS3(ipfsObject, ipfsHash);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `success, pinned ${ipfsHash}`,
      input: event,
    })
  };

  callback(null, response);
};

let getIpfsObjectFromRequest = async (event, callback) => {

  let queryStringParameters = event["queryStringParameters"];

  if (!queryStringParameters) {
    queryStringParameters = [];
  }

  const userAddress = queryStringParameters["userAddress"];
  const businessAddress = queryStringParameters["businessAddress"];
  const businessRating = queryStringParameters["businessRating"];
  const businessReviewText = queryStringParameters["businessReviewText"];
  const workerAddress = queryStringParameters["workerAddress"];
  const workerRating = queryStringParameters["workerRating"];
  const workerReviewText = queryStringParameters["workerReviewText"];

  let errorMessage = [];
  errorMessage.push(missingFieldErrorMessage(userAddress, businessAddress, businessRating, workerAddress, workerRating));
  errorMessage.push(badEthereumAddressErrorMessage(userAddress, businessAddress, workerAddress));
  errorMessage.push(badRatingValueErrorMessage(businessRating, workerRating));

  // return error
  if (errorMessage) {

    const response = {
      statusCode: 400,
      body: JSON.stringify({
        message: errorMessage.join(" ").trim(),
        input: event,
      })
    };

    callback(null, response);
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

let missingFieldErrorMessage = (userAddress, businessAddress, businessRating, workerAddress, workerRating) => {

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

let badEthereumAddressErrorMessage = (userAddress, businessAddress, workerAddress) => {

  let badAddresses = [];

  if (userAddress && !isAddress(userAddress)) {
    badAddresses.push("userAddress");
  }

  if (businessAddress && !isAddress(businessAddress)) {
    badAddresses.push("businessAddress");
  }

  if (workerAddress && !isAddress(workerAddress)) {
    badAddresses.push("workerAddress");
  }

  if (badAddresses.length > 0) {
    return(`The following ethereum addresses are not valid: [${badAddresses.join(", ")}].`);
  }
};

let badRatingValueErrorMessage = (businessRating, workerRating) => {

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

let storeToIpfs = (ipfsObject) => {

  const ipfs = new IPFS({ host: 'ec2-34-239-123-139.compute-1.amazonaws.com', port: 5001, protocol: 'http' });

  return new Promise(function(resolve, reject) {

    ipfs.addJSON(ipfsObject, (error, result) => {

      if (error) {
        return reject(error);
      }

      resolve(result);
    });
  });
};


let storeToS3 = async (ipfsObject, ipfsHash) => {

  const s3 = new AWS.S3();

  const params = {
    Bucket : "kudos-experiences",
    Key : ipfsHash,
    Body : ipfsObject
  };

  s3.putObject(params, function(error, data) {

    if (error) {
      console.log(error, error.stack);
    }

    console.log(data);
  });
};