import ethUtil from "ethereumjs-util";

const axios = require("axios");

// TODO  -- abstract this call to lambda function so you have the option to swap out INFURA for something else later on
// axios.defaults.baseURL = 'https://k8ariy4jr4.execute-api.us-east-1.amazonaws.com/dev';z
// axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.baseURL = 'https://ropsten.infura.io/';
const wallet = Wallet.fromPrivateKey(privateKey);
const provider = new WalletProvider(wallet, "https://ropsten.infura.io/2wx4womFMFUEyRBJKbKq");

const kudosSigner = {

  getSignature: async (businessAddress, userId) => {

    const nonceValue = await getNonce(businessAddress);

    const message = ethUtil.toBuffer(nonceValue);
    const messageHash = ethUtil.hashPersonalMessage(message);

    const privateKey = new Buffer(process.env.KUDOS_ACCOUNT_SEED, 'hex');
    const signature = ethUtil.ecsign(messageHash, privateKey);

    return signature;
  }
};

async function getNonce(businessAddressArg) {

  return new Promise(function(resolve, reject) {

    return axios.get('/getNonceForUpdatingRegistry', {

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


export default kudosSigner;