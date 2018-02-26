'use strict';
import KudosContractService from '../services/KudosContractService';

export default async (event, context, callback) => {

  // await registerBusiness();

  // await KudosContractService.registerAsBusiness();

  // var isBusiness = await KudosContractService.isBusiness();

  // test
  // test2

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `it will be ${isBusiness}`,
      input: event,
    })
  };

  callback(null, response);
};