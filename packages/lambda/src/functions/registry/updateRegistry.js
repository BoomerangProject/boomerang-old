'use strict';

import ethUtil from "ethereumjs-util";
import database from "../../services/database/Database";
import okayResponse from "../../responses/okayResponse";
import invalidSignatureResponse from "../../responses/invalidSignatureResponse";

export default async (event, context, callback) => {

  const businessAddress = getBusinessAddress(event);
  const signature = getSignature(event);
  const userId = getUserId(event);
  const userAddress = getUserAddress(event);

  //

  const recoveredAddress = await getRecoveredAddress(businessAddress, signature);

  if (recoveredAddress !== businessAddress) {
    callback(null, invalidSignatureResponse);
    return;
  }

  if (userId == null || userId === "") {
    await database.deleteFromRegistry(businessAddress, userAddress);
  } else {
    await database.putInRegistry(businessAddress, userAddress, userId);
  }

  await database.incrementNonceForUpdatingRegistry(businessAddress);

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

const getRecoveredAddress = async function(businessAddress, signature) {

  const nonceValue = await database.getNonceForUpdatingRegistry(businessAddress);

  const message = ethUtil.toBuffer(nonceValue);
  const messageHash = ethUtil.hashPersonalMessage(message);
  const publicKey = ethUtil.ecrecover(messageHash, signature.v, signature.r, signature.s);
  const sender = ethUtil.publicToAddress(publicKey);
  const recoveredAddress = ethUtil.bufferToHex(sender);
  return recoveredAddress;
};