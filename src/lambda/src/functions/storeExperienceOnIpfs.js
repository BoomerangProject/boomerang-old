'use strict';
import IPFS from "ipfs-mini";
import AWS from "aws-sdk";

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

    const errorMessage = `the following required fields are missing: [${missingFields.join(", ")}]`;

    const response = {
      statusCode: 400,
      body: JSON.stringify({
        message: errorMessage,
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

let storeToIpfs = async (ipfsObject) => {

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