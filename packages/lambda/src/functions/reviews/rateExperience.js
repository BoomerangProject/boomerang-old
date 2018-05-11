'use strict';
import KudosContractService from '../../services/KudosContractServiceOld';



export default async (event, context, callback) => {

  var queryStringParameters = event.queryStringParameters;

  var businessAddress = queryStringParameters["businessAddress"];
  var businessRating = queryStringParameters["businessRating"];
  var businessReviewText = queryStringParameters["businessReviewText"];
  var workerAddress = queryStringParameters["workerAddress"];
  var workerRating = queryStringParameters["workerRating"];
  var workerReviewText = queryStringParameters["workerReviewText"];


  var ipfsHash = addExperienceToIpfs(businessRating, businessReviewText, workerRating, workerReviewText);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `businessAddress = ${businessAddress}
      businessRating = ${businessRating}
      workerAddress = ${workerAddress}
      workerRating = ${workerRating}`,
      input: event,
    })
  };

  callback(null, response);
};


/*
    await kudos.rateExperience( signature.v,
                                signature.r,
                                signature.s,
                                business,
                                5,
                                worker,
                                5,
                                ipfsHashInBytes("QmdXuenGKXGmSBdFZdfWqcHzZuDKiQ8eUZ1h5ZQHGNdVLy"),
                                {from: user});
 */