'use strict';
import KudosContractService from '../services/KudosContractService';
import okayResponse from "../responses/okayResponse";

export default async (event, context, callback) => {

  // await registerBusiness();

  // await KudosContractService.registerAsBusiness();

  var isBusiness = await KudosContractService.isBusiness();


  callback(null, okayResponse);
};