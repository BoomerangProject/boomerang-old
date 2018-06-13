'use strict';
import errorResponse from "../../responses/errorResponse";
import storeToIpfs from '../../services/IpfsService';
import storeToS3 from "../../services/S3Service";
import registerAsBusinessTransaction from './RegisterAsBusinessSigner';
import s3errorResponse from "../../responses/s3errorResponse";
import ipfsErrorResponse from "../../responses/ipfsErrorResponse";
import signedTransactionResponse from "../../responses/smartContractReceiptResponse";
import signTransaction from "./TransactionSigner";
import ipfsHashInBytes from "../../util/IpfsHashStringToBytesConverter";

const getUserName = function(event) {

  const jsonBody = JSON.parse(event.body);
  return jsonBody.workerName;
};

const getUserAddress = function(event) {

  const jsonBody = JSON.parse(event.body);
  return jsonBody.businessAddress;
};

export default async (event, context, callback) => {

  const userName = getUserName(event);
  const userAddress = getUserAddress(event);

  if (userName == null || userName.length < 1) {
    callback(null, errorResponse('userName is required'));
    return;
  }

  if (userAddress == null || userAddress.length < 1) {
    callback(null, errorResponse('userAddress is required'));
    return;
  }

  // ---

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

  // ---

  let signedTransaction;
  try {
    signedTransaction = await signTransaction('registerAsUser', [userAddress, ipfsHashInBytes(ipfsHash)]);
  } catch (error) {
    return callback(null, errorResponse('problem with signing transaction: ' + error));
  }

  callback(null, signedTransactionResponse(signedTransaction));
};