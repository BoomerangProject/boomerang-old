import ethUtil from "ethereumjs-util";
import axios from "axios";

// axios.defaults.baseURL = 'https://k8ariy4jr4.execute-api.us-east-1.amazonaws.com/dev';
axios.defaults.baseURL = 'http://localhost:3000';

const kudosSigner = {

  getSignature: async (businessAddress, userId) => {

    const nonceValue = await getNonce(businessAddress, userId);

    console.log(nonceValue);

    const message = ethUtil.toBuffer(nonceValue);
    const messageHash = ethUtil.hashPersonalMessage(message);

    const privateKey = new Buffer(process.env.KUDOS_ACCOUNT_SEED, 'hex');
    const signature = ethUtil.ecsign(messageHash, privateKey);

    return signature;
  }
};

async function getNonce(businessAddressArg, userIdArg) {

  return new Promise(function(resolve, reject) {

    return axios.get('/getNonceValue', {

      params: {
        businessAddress: businessAddressArg,
        userId: userIdArg
      }

    }).then(function (response) {

      const nonceValue = response.data.nonce;
      return resolve(nonceValue);

    }).catch(function (error) {
      return reject(error);
    });
  });
}

module.exports = kudosSigner;