'use strict';
import errorResponse from "../../responses/errorResponse";
import storeToIpfs from '../../services/IpfsService';
import storeToS3 from "../../services/S3Service";
import s3errorResponse from "../../responses/s3errorResponse";
import ipfsErrorResponse from "../../responses/ipfsErrorResponse";
import signedTransactionResponse from "../../responses/smartContractReceiptResponse";
import ipfsHashInBytes from '../../util/IpfsHashStringToBytesConverter';
import signTransaction from './TransactionSigner';

const getBusinessAddress = function(event) {

  const jsonBody = JSON.parse(event.body);
  return jsonBody.businessAddress;
};

const getNumberOfRewardSteps = function(event) {

  const jsonBody = JSON.parse(event.body);
  return jsonBody.numberOfRewardSteps;
};

const getNumberOfRewardCycles = function(event) {

  const jsonBody = JSON.parse(event.body);
  return jsonBody.numberOfRewardCycles;
};

const getNumberOfRewardLevels = function(event) {

  const jsonBody = JSON.parse(event.body);
  return jsonBody.numberOfRewardLevels;
};

const getLevelRewardsArray = function(event) {

  const jsonBody = JSON.parse(event.body);
  return jsonBody.levelRewards;
};

const getRatingRewardsArray = function(event) {

  const jsonBody = JSON.parse(event.body);
  return jsonBody.ratingRewards;
};

const getIpfsObject = function(event) {

  const jsonBody = JSON.parse(event.body);
  return jsonBody.ipfsObject;
};

export default async (event, context, callback) => {

  const businessAddress = getBusinessAddress(event);
  const numberOfRewardSteps = getNumberOfRewardSteps(event);
  const numberOfRewardCycles = getNumberOfRewardCycles(event);
  const numberOfRewardLevels = getNumberOfRewardLevels(event);
  const levelRewards = getLevelRewardsArray(event);
  const ratingRewards = getRatingRewardsArray(event);
  const ipfsObject = getIpfsObject(event);

  if (businessAddress == null || businessAddress.length < 1) {
    callback(null, errorResponse('businessAddress is required'));
    return;
  }

  if (numberOfRewardSteps == null || numberOfRewardSteps.length < 1) {
    callback(null, errorResponse('numberOfRewardSteps is required'));
    return;
  }

  if (numberOfRewardCycles == null || numberOfRewardCycles.length < 1) {
    callback(null, errorResponse('numberOfRewardCycles is required'));
    return;
  }

  if (numberOfRewardLevels == null || numberOfRewardLevels.length < 1) {
    callback(null, errorResponse('numberOfRewardLevels is required'));
    return;
  }

  if (levelRewards == null || levelRewards.length < 1) {
    callback(null, errorResponse('levelRewards is required'));
    return;
  }

  if (ratingRewards == null || ratingRewards.length < 1) {
    callback(null, errorResponse('ratingRewards is required'));
    return;
  }

  if (ipfsObject == null || ipfsObject.length < 1) {
    callback(null, errorResponse('ipfsObject is required'));
    return;
  }

  // ---

  let ipfsHash;

  try {
    ipfsHash = await storeToIpfs(ipfsObject);
  } catch (error) {
    return callback(null, ipfsErrorResponse(error));
  }

  console.log('ipfsHash: ' + ipfsHash);

  try {
    await storeToS3('kudos-registerworkerrewardsystem', ipfsHash, ipfsObject);
  } catch (error) {
    return callback(null, s3errorResponse(error));
  }

  // ---
  let signedTransaction;
  try {
//    signedTransaction = await signTransaction('registerWorkerRewardSystem', [businessAddress, numberOfRewardSteps, numberOfRewardCycles, numberOfRewardLevels, levelRewards, ratingRewards, ipfsHashInBytes(ipfsHash)]);
    signedTransaction = await signTransaction('registerWorkerRewardSystem', [businessAddress, numberOfRewardSteps, numberOfRewardCycles, numberOfRewardLevels, ipfsHashInBytes(ipfsHash)]);
  } catch (error) {
    return callback(null, errorResponse('problem with signing transaction: ' + error));
  }

  callback(null, signedTransactionResponse(signedTransaction));
};