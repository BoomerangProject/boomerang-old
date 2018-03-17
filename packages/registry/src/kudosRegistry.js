import ethUtil from "ethereumjs-util";
require('dotenv').config();

const axios = require("axios");
axios.defaults.baseURL = 'https://k8ariy4jr4.execute-api.us-east-1.amazonaws.com/dev';
axios.defaults.timeout = 30000;

const kudosRegistry = {

  addUser: async (businessAddress, userId, userAddress) => {

    const nonceValue = await getNonce(businessAddress);

    const message = ethUtil.toBuffer(nonceValue);
    const messageHash = ethUtil.hashPersonalMessage(message);

    const privateKey = new Buffer(process.env.KUDOS_ACCOUNT_SEED, 'hex');
    const signature = ethUtil.ecsign(messageHash, privateKey);

    const statusCode = await addUserToRegistry(businessAddress, signature, userId, userAddress);
    return statusCode;
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

      return resolve(response);

    }).catch(function (error) {
      return reject(error);
    });
  });
}

export default kudosRegistry;