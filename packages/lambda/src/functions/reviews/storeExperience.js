'use strict';
import IPFS from "ipfs-mini";
import AWS from "aws-sdk";
import s3errorResponse from "../../responses/s3errorResponse";
import ipfsErrorResponse from "../../responses/ipfsErrorResponse";

export default async (event, context, callback) => {

  const ipfsObject = JSON.parse(event.body);

  let ipfsHash;

  try {
    ipfsHash = await storeToIpfs(ipfsObject, event, callback);
  } catch (error) {
    return callback(null, ipfsErrorResponse(error));
  }

  try {
    await storeToS3(ipfsObject, ipfsHash, event, callback);
  }
  catch (error) {
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

let storeToIpfs = async (ipfsObject, event, callback) => {

  let storeToIpfsPromise;

  try {

    const ipfs = new IPFS({host: 'ec2-34-239-123-139.compute-1.amazonaws.com', port: 5001, protocol: 'http'});

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