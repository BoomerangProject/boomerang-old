'use strict';
import KudosContractService from '../services/KudosContractServiceOld';

export default async (event, context, callback) => {

  const businessAddress = event.queryStringParameters.businessAddress;
  const userId = event.queryStringParameters.userId;

  const nonceValue = await KudosContractService.getNonceValue(businessAddress, userId);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      nonce: nonceValue.toNumber()
    })
  };

  callback(null, response);
};