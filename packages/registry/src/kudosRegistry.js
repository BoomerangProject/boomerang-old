import ethUtil from "ethereumjs-util";
require('dotenv').config();

const axios = require("axios");
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.timeout = 30000;

const kudosRegistry = {

  addUser: async (businessAddress, userId, userAddress) => {

    const nonceValue = await getNonce(businessAddress);

    const message = ethUtil.toBuffer(nonceValue);
    const messageHash = ethUtil.hashPersonalMessage(message);

    const privateKey = process.env.KUDOS_ACCOUNT_SEED;
    const signature = ethUtil.ecsign(messageHash, privateKey);

    return await addUserToRegistry(businessAddress, signature, userId, userAddress);
  }
};

async function getNonce(businessAddressArg) {

  return new Promise(function(resolve, reject) {

    return axios.get('/getNonceForAddingUserToRegistry', {

      params: {
        businessAddress: businessAddressArg
      }

    }).then(function (response) {

      const nonceValue = response.data.nonce;
      return resolve(nonceValue);

    }).catch(function (error) {
      return reject(error);
    });
  });
}

async function addUserToRegistry(businessAddressArg, signatureArg, userIdArg, userAddressArg) {

  return new Promise(function(resolve, reject) {

    return axios.post('/addUserToRegistry', {

      businessAddress: businessAddressArg,
      signature: signatureArg,
      userId: userIdArg,
      userAddress: userAddressArg,

    }).then(function (response) {

      return resolve(response.status);

    }).catch(function (error) {
      return resolve(error.response.status);
    });
  });
}

export default kudosRegistry;