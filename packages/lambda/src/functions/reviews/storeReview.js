'use strict';
import IPFS from "ipfs-mini";
import AWS from "aws-sdk";
import s3errorResponse from "../../responses/s3errorResponse";
import ipfsErrorResponse from "../../responses/ipfsErrorResponse";

export default async (event, context, callback) => {

  const ipfsObject = JSON.parse(event.body);

  let ipfsHash;

  try {
    ipfsHash = await storeToIpfs(ipfsObject);
  } catch (error) {
    return callback(null, ipfsErrorResponse(error));
  }

  try {
    await storeToS3(ipfsObject, ipfsHash);
  } catch (error) {
    return callback(null, s3errorResponse(error));
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

  return new Promise(function(resolve, reject) {

    const ipfs = new IPFS({host: 'ec2-54-172-136-192.compute-1.amazonaws.com', port: 5001, protocol: 'http'});

    ipfs.addJSON(ipfsObject, function(error, result) {

      if (error) {
        console.log(error);
        return reject(error);
      }

      return resolve(result);
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
        console.log(error);
        return reject(error);
      }

      return resolve(data);
    });

  });
};