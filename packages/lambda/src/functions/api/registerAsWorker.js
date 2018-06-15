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

const getWorkerName = function(event) {

  const jsonBody = JSON.parse(event.body);
  return jsonBody.workerName;
};

const getWorkerAddress = function(event) {

  const jsonBody = JSON.parse(event.body);
  return jsonBody.workerAddress;
};

export default async (event, context, callback) => {

  const workerName = getWorkerName(event);
  const workerAddress = getWorkerAddress(event);

  if (workerName == null || workerName.length < 1) {
    callback(null, errorResponse('workerName is required'));
    return;
  }

  if (workerAddress == null || workerAddress.length < 1) {
    callback(null, errorResponse('workerAddress is required'));
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
    signedTransaction = await signTransaction('registerAsWorker', [workerAddress, ipfsHashInBytes(ipfsHash)]);
  } catch (error) {
    return callback(null, errorResponse('problem with signing transaction: ' + error));
  }

  callback(null, signedTransactionResponse(signedTransaction));
};