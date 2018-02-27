'use strict';
import ipfsAPI from "ipfs-api";

export default async (event, context, callback) => {

  var ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'});

  ipfs.pin.ls(function (err, pinset) {
    if (err) {
      throw err
    }
    console.log(pinset)
  });


  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `it will be`,
      input: event,
    })
  };

  callback(null, response);
};