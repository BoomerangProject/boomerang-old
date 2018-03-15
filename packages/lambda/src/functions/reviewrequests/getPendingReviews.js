'use strict';

export default async (event, context, callback) => {


  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `success`,
      input: event,
    })
  };

  callback(null, response);
};

