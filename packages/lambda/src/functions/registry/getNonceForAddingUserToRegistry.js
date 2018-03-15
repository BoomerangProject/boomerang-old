'use strict';
import database from "../../services/database/Database";

export default async (event, context, callback) => {

  const nonceValue = await database.getNonceForAddingUserToRegistry(event.queryStringParameters.businessAddress);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      nonce: nonceValue
    })
  };

  callback(null, response);
}