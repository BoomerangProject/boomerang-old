'use strict';
import IPFS from "ipfs-mini";
import AWS from "aws-sdk";
import s3errorResponse from "../../responses/s3errorResponse";
import ipfsErrorResponse from "../../responses/ipfsErrorResponse";

export default async (event, context, callback) => {

  const ipfsObject = JSON.parse(event.body);

  // let ipfsHash;
  //
  // try {
  //   ipfsHash = await storeToIpfs(ipfsObject);
  // } catch (error) {
  //   return callback(null, ipfsErrorResponse(error));
  // }

  try {
    await storeToS3(ipfsObject, ipfsHash);
  }
  catch (error) {
    const errorResponse = await s3errorResponse(error);
    return callback(null, errorResponse);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `success, pinned ${ipfsHash}`,
      input: event,
    })
  };

  return callback(null, response);
}

let storeToIpfs = async (ipfsObject) => {

  const ipfs = new IPFS({host: 'ec2-34-239-123-139.compute-1.amazonaws.com', port: 5001, protocol: 'http'});

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

  return new Promise(function(resolve, reject) {

    const s3 = new AWS.S3();

    const params = {
      Bucket: "kudos-experiences",
      Key: ipfsHash,
      Body: JSON.stringify(ipfsObject)
    };

    s3.putObject(params, function(error, data) {

      if (error) {
        return reject(error);
      }

      resolve(data);
    });

  });
};