'use strict';

import ethUtil from "ethereumjs-util";
import database from "../../services/database/Database";
import okayResponse from "../../responses/okayResponse";
import invalidSignatureResponse from "../../responses/invalidSignatureResponse";
const Web3Utils = require('web3-utils');
const soliditySha3 = Web3Utils.soliditySha3;

//TODO make user send hash that is the userId signed with the business's private key

export default async (event, context, callback) => {

  const businessAddress = event.queryStringParameters.businessAddress;

  const nonceValue = await database.getNonceForAddingUserToRegistry(businessAddress);

  const message = ethUtil.toBuffer(nonceValue);
  const messageHash = ethUtil.hashPersonalMessage(message);

  const signature = getSignature(event);

  console.log(signature);

  const publicKey = ethUtil.ecrecover(messageHash, signature.v, signature.r, signature.s);
  const sender = ethUtil.publicToAddress(publicKey);
  const address = ethUtil.bufferToHex(sender);

  if (address !== businessAddress) {
    callback(null, invalidSignatureResponse);
    return;
  }

  const userId = event.queryStringParameters.userId;
  const userAddress = event.queryStringParameters.userAddress;


  callback(null, okayResponse);
};


const getSignature = function(event) {

  return JSON.parse(event.body);
};