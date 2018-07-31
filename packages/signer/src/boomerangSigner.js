import ethUtil from "ethereumjs-util";
import axios from "axios";

axios.defaults.baseURL = 'https://k8ariy4jr4.execute-api.us-east-1.amazonaws.com/dev';
// axios.defaults.baseURL = 'http://localhost:3000';


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const boomerangSigner = {

  getSignature: async (businessAddress, userId) => {

    // const nonceValue = await getNonce(businessAddress, userId);
    const nonceValue = 27031;
    //
    // for (var i = 0; i < 10; i++) {
    //
    //   const value = getRandomInt(0,32000);
    //   console.log(value);
    //
    //   const message = ethUtil.toBuffer(value);
    //   const messageHash = ethUtil.hashPersonalMessage(message);
    //
    //   console.log(messageHash);
    //
    //   const privateKey = new Buffer(process.env.BOOMERANG_ACCOUNT_SEED, 'hex');
    //   const signature = ethUtil.ecsign(messageHash, privateKey);
    //
    //   console.log(signature);
    // }

    const message = ethUtil.toBuffer(nonceValue);
    console.log("message");
    console.log(message);
    const messageHash = ethUtil.hashPersonalMessage(message);
    console.log("messageHash");
    console.log(messageHash);
    const privateKey = new Buffer(process.env.BOOMERANG_ACCOUNT_SEED, 'hex');
    const signature = ethUtil.ecsign(messageHash, privateKey);


    console.log(ethUtil.publicToAddress(ethUtil.ecrecover(messageHash, 27, signature.r, signature.s)));
    console.log(ethUtil.publicToAddress(ethUtil.ecrecover(messageHash, 28, signature.r, signature.s)));

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

module.exports = boomerangSigner;