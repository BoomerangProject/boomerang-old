'use strict';
import IPFS from "ipfs-mini";
import AWS from "aws-sdk";
import s3errorResponse from "../../responses/s3errorResponse";
import ipfsErrorResponse from "../../responses/ipfsErrorResponse";
import ipfsOkayResponse from "../../responses/ipfsOkayResponse";

const s3 = new AWS.S3();
const ipfs = new IPFS({host: 'ec2-54-172-136-192.compute-1.amazonaws.com', port: 5001, protocol: 'http'});

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

  return callback(null, ipfsOkayResponse(ipfsHash));
}

let storeToIpfs = async (ipfsObject) => {

  return new Promise(function(resolve, reject) {

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

    const params = {
      ACL: 'private',
      Bucket: 'kudos-businessdirectory',
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