'use strict';
import errorResponse from "../../responses/errorResponse";
import storeToIpfs from '../../services/IpfsService';
import storeToS3 from "../../services/S3Service";
import s3errorResponse from "../../responses/s3errorResponse";
import ipfsErrorResponse from "../../responses/ipfsErrorResponse";
import signedTransactionResponse from "../../responses/smartContractReceiptResponse";
import signTransaction from "./TransactionSigner";
import ipfsHashInBytes from "../../util/IpfsHashStringToBytesConverter";

const getUserAddress = function(event) {

  const jsonBody = JSON.parse(event.body);
  return jsonBody.userAddress;
};

const getWorkerAddress = function(event) {

  const jsonBody = JSON.parse(event.body);
  return jsonBody.workerAddress;
};

const getBusinessAddress = function(event) {

  const jsonBody = JSON.parse(event.body);
  return jsonBody.businessAddress;
};

const getWorkerRating = function(event) {

  const jsonBody = JSON.parse(event.body);
  return jsonBody.workerRating;
};

const getBusinessRating = function(event) {

  const jsonBody = JSON.parse(event.body);
  return jsonBody.businessRating;
};

const getIpfsHash = function(event) {

  const jsonBody = JSON.parse(event.body);
  return jsonBody.ipfsHash;
};

export default async (event, context, callback) => {

  const userAddress = getUserAddress(event);
  const workerAddress = getWorkerAddress(event);
  const businessAddress = getBusinessAddress(event);
  const workerRating = getWorkerRating(event);
  const businessRating = getBusinessRating(event);
  const ipfsHash = getIpfsHash(event);

  console.log('rateBoomerangExperience');
  console.log('-----------------------------');
  console.log('userAddress: ' + userAddress);
  console.log('workerAddress: ' + workerAddress);
  console.log('businessAddress: ' + businessAddress);
  console.log('workerRating: ' + workerRating);
  console.log('businessRating: ' + businessRating);
  console.log('ipfsHash: ' + ipfsHash);

  if (userAddress == null || userAddress.length < 1) {
    callback(null, errorResponse('userAddress is required'));
    return;
  }

  if (workerAddress == null || workerAddress.length < 1) {
    callback(null, errorResponse('workerAddress is required'));
    return;
  }

  if (businessAddress == null || businessAddress.length < 1) {
    callback(null, errorResponse('businessAddress is required'));
    return;
  }

  if (workerRating == null || workerRating.length < 1) {
    callback(null, errorResponse('workerRating is required'));
    return;
  }

  if (businessRating == null || businessRating.length < 1) {
    callback(null, errorResponse('businessRating is required'));
    return;
  }

  if (ipfsHash == null || ipfsHash.length < 1) {
    callback(null, errorResponse('ipfsHash is required'));
    return;
  }
  // ---

  // const ipfsObject = JSON.parse(event.body);
  //
  // try {
  //   await storeToIpfs(ipfsObject);
  // } catch (error) {
  //   return callback(null, ipfsErrorResponse(error));
  // }
  //
  // console.log('ipfsHash: ' + ipfsHash);
  //
  // try {
  //   await storeToS3('boomerang-rated-experience', ipfsHash, ipfsObject);
  // } catch (error) {
  //   return callback(null, s3errorResponse(error));
  // }

  // ---

  let signedTransaction;
  try {
    signedTransaction = await signTransaction('rateBoomerangExperience', [userAddress, workerAddress, businessAddress, workerRating, businessRating, ipfsHashInBytes(ipfsHash)]);
  } catch (error) {
    return callback(null, errorResponse('problem with signing transaction: ' + error));
  }

  callback(null, signedTransactionResponse(signedTransaction));
};