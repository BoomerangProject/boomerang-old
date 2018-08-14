'use strict';
import boomerangContract from '../services/BoomerangContractService';
import errorResponse from '../responses/errorResponse';

const getBusinessAddress = function(event) {

  return event.queryStringParameters.businessAddress;
};

const getWorkerAddress = function(event) {

  return event.queryStringParameters.workerAddress;
};

export default async (event, context, callback) => {

  const businessAddress = getBusinessAddress(event);
  const workerAddress = getWorkerAddress(event);

  if (businessAddress == null || businessAddress.length < 1) {
    callback(null, errorResponse('businessAddress is required'));
    return;
  }

  if (workerAddress == null || workerAddress.length < 1) {
    callback(null, errorResponse('workerAddress is required'));
    return;
  }

  const nonceValue = await boomerangContract.methods.getNonceValueForNewRating(businessAddress, workerAddress).call();

  console.log('businessAddress: ' + businessAddress);
  console.log('workerAddress: ' + workerAddress);
  console.log('nonce value: ' + nonceValue);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      nonce: nonceValue
    })
  };

  callback(null, response);
};