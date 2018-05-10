'use strict';
import okayResponse from "../../responses/okayResponse";
import errorResponse from "../../responses/errorResponse";
import storeToIpfs from '../../services/IpfsService';
import storeToS3 from "../../services/S3Service";
import s3errorResponse from "../../responses/s3errorResponse";
import ipfsErrorResponse from "../../responses/ipfsErrorResponse";

const getBusinessName = function(event) {

  const jsonBody = JSON.parse(event.body);
  return jsonBody.businessName;
};

const getBusinessDescription = function(event) {

  const jsonBody = JSON.parse(event.body);
  return jsonBody.businessDescription;
};



export default async (event, context, callback) => {

  const businessName = getBusinessName(event);
  const businessDescription = getBusinessDescription(event);

  if (businessName == null || businessName.length < 1) {
    callback(null, errorResponse);
    return;
  }

  if (businessDescription == null || businessDescription.length < 1) {
    callback(null, errorResponse);
    return;
  }

  const ipfsObject = JSON.parse(event.body);

  let ipfsHash;

  try {
    ipfsHash = await storeToIpfs(ipfsObject);
  } catch (error) {
    return callback(null, ipfsErrorResponse(error));
  }

  console.log('ipfsHash: ' + ipfsHash);

  try {
    await storeToS3('kudos-profiles', ipfsHash, ipfsObject);
  } catch (error) {
    return callback(null, s3errorResponse(error));
  }

  callback(null, okayResponse);
};