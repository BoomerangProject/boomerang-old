'use strict';
import BoomerangContractService from '../services/BoomerangContractServiceOld';

export default async (event, context, callback) => {

  const businessAddress = event.queryStringParameters.businessAddress;
  const userId = event.queryStringParameters.userId;

  const nonceValue = await BoomerangContractService.getNonceValue(businessAddress, userId);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      nonce: nonceValue.toNumber()
    })
  };

  callback(null, response);
};