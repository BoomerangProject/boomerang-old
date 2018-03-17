'use strict';
import database from "../../services/database/Database";

export default async (event, context, callback) => {

  const businessAddress = event.queryStringParameters.businessAddress;
  const nonceValue = await database.getNonceForUpdatingRegistry(businessAddress);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      nonce: nonceValue
    })
  };

  callback(null, response);
}