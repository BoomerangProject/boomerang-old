'use strict';
import IPFS from "ipfs-mini";

let getIpfsObjectFromRequest = async (event) => {

  var queryStringParameters = event["queryStringParameters"];

  var userAddress = queryStringParameters["userAddress"];

  var businessAddress = queryStringParameters["businessAddress"];
  var businessRating = queryStringParameters["businessRating"];
  var businessReviewText = queryStringParameters["businessReviewText"];
  var workerAddress = queryStringParameters["workerAddress"];
  var workerRating = queryStringParameters["workerRating"];
  var workerReviewText = queryStringParameters["workerReviewText"];

  var ipfsObject = {
    userAddress: "funny",
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

  var ipfsHash;

  await ipfs.addJSON(ipfsObject, (err, result) => {
    console.log(err, result);
    ipfsHash = result;
  });

  return ipfsHash;
};

export default async (event, context, callback) => {


  const ipfsObject = await getIpfsObjectFromRequest(event);
  const ipfsHash = await storeToIpfs(ipfsObject);

  console.log(ipfsHash);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `success`,
      input: event,
    })
  };

  callback(null, response);
};