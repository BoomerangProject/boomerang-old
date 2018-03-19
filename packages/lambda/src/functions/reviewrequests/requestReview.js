'use strict';
import database from "../../services/database/Database";
import okayResponse from "../../responses/okayResponse";

const userAddress = function(event) {

  return event.queryStringParameters.userAddress;
};

const experienceMetadata = function(event) {

  return JSON.parse(event.body);
};

export default async (event, context, callback) => {

  database.addPendingReview(userAddress(event), experienceMetadata(event));

  await database.incrementNonceForUpdatingRegistry(event.queryStringParameters.userAddress);

  callback(null, okayResponse);
};

