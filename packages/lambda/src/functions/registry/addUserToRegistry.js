'use strict';

import ethUtil from "ethereumjs-util";
import database from "../../services/database/Database";
import okayResponse from "../../responses/okayResponse";
import invalidSignatureResponse from "../../responses/invalidSignatureResponse";
const Web3Utils = require('web3-utils');
const soliditySha3 = Web3Utils.soliditySha3;

//TODO make user send hash that is the userId signed with the business's private key

export default async (event, context, callback) => {

  const businessAddress = getBusinessAddress(event);
  const signature = getSignature(event);
  const userId = getUserId(event);
  const userAddress = getUserAddress(event);

  //

  const nonceValue = await database.getNonceForAddingUserToRegistry(businessAddress);

  const message = ethUtil.toBuffer(nonceValue);
  const messageHash = ethUtil.hashPersonalMessage(message);
  const publicKey = ethUtil.ecrecover(messageHash, signature.v, signature.r, signature.s);
  const sender = ethUtil.publicToAddress(publicKey);
  const recoveredAddress = ethUtil.bufferToHex(sender);

  if (recoveredAddress !== businessAddress) {
    callback(null, invalidSignatureResponse);
    return;
  }

  callback(null, okayResponse);
};


const getSignature = function(event) {

  const jsonBody = JSON.parse(event.body, (k, v) => {

    if (v !== null            &&
        typeof v === 'object' &&
        'type' in v           &&
        v.type === 'Buffer'   &&
        'data' in v           &&
        Array.isArray(v.data)) {

      return new Buffer(v.data);
    }

    return v;
  });

  return jsonBody.signature;
};

const getBusinessAddress = function(event) {

  const jsonBody = JSON.parse(event.body);
  return jsonBody.businessAddress;
};

const getUserId = function(event) {

  const jsonBody = JSON.parse(event.body);
  return jsonBody.userId;
};

const getUserAddress = function(event) {

  const jsonBody = JSON.parse(event.body);
  return jsonBody.userAddress;
};