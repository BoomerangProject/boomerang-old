'use strict';
import BoomerangContractService from '../services/BoomerangContractService';
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

  if (workerAddress == null || userId.length < 1) {
    callback(null, errorResponse('workerAddress is required'));
    return;
  }

  const nonceValue = await BoomerangContractService.getNonceValue(businessAddress, workerAddress);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      nonce: nonceValue.toNumber()
    })
  };

  callback(null, response);
};