'use strict';

import ethUtil from "ethereumjs-util";
const Web3Utils = require('web3-utils');
const soliditySha3 = Web3Utils.soliditySha3;

//TODO make user send hash that is the userId signed with the business's private key

export default async (event, context, callback) => {

  // get nonce to sign

  // sign the none and 


  const data = '1';
  const message = ethUtil.toBuffer(data);
  const messageHash = ethUtil.hashPersonalMessage(message);

  const privateKey = new Buffer("a62d1306d2f88e6a9e5adf5b8a632d5026019bfb450c009886dba13e9ed357aa", "hex");
  const signature = ethUtil.ecsign(messageHash, privateKey);
  const publicKey = ethUtil.ecrecover(messageHash, signature.v, signature.r, signature.s);
  const sender = ethUtil.publicToAddress(publicKey);
  const addr = ethUtil.bufferToHex(sender);
  //




  console.log(addr);



  const queryStringParameters = event.queryStringParameters;

  const userId = queryStringParameters.userId;
  const businessAddress = queryStringParameters.businessAddress;

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `it will be success`,
      input: event,
    })
  };

  callback(null, response);
};