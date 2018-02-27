'use strict';
import IPFS from "ipfs-mini";

export default async (event, context, callback) => {

  const ipfsObject = await getIpfsObjectFromRequest(event);
  const ipfsHash = await storeToIpfs(ipfsObject);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `success, pinned ${ipfsHash}`,
      input: event,
    })
  };

  callback(null, response);
};

let getIpfsObjectFromRequest = async (event) => {

  const queryStringParameters = event["queryStringParameters"];

  const userAddress = queryStringParameters["userAddress"];

  const businessAddress = queryStringParameters["businessAddress"];
  const businessRating = queryStringParameters["businessRating"];
  const businessReviewText = queryStringParameters["businessReviewText"];
  const workerAddress = queryStringParameters["workerAddress"];
  const workerRating = queryStringParameters["workerRating"];
  const workerReviewText = queryStringParameters["workerReviewText"];

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

