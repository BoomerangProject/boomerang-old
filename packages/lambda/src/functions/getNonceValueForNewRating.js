'use strict';
import boomerangContract from '../services/BoomerangContractService';
import errorResponse from '../responses/errorResponse';

const getBusinessAddress = function(event) {

  return event.queryStringParameters.businessAddress;
};

const getUserAddress = function(event) {

  return event.queryStringParameters.userAddress;
};

export default async (event, context, callback) => {

  const businessAddress = getBusinessAddress(event);
  const userAddress = getUserAddress(event);

  if (businessAddress == null || businessAddress.length < 1) {
    callback(null, errorResponse('businessAddress is required'));
    return;
  }

  if (userAddress == null || userAddress.length < 1) {
    callback(null, errorResponse('userAddress is required'));
    return;
  }

  const nonceValue = await boomerangContract.methods.getNonceValueForNewRating(businessAddress, userAddress).call();

  console.log('businessAddress: ' + businessAddress);
  console.log('userAddress: ' + userAddress);
  console.log('nonce value: ' + nonceValue);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      nonce: nonceValue
    })
  };

  callback(null, response);
};