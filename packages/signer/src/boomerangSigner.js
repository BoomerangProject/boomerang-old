import ethUtil from "ethereumjs-util";
import ethAbi from "ethereumjs-abi";
import axios from "axios";

const privateKeyOfTheBusiness = '2413fffb1c65c4da92322c52e1b609c2f69b19e14cb178ec06d8ee63dc622f73';
// const privateKey = new Buffer(process.env.BOOMERANG_ACCOUNT_SEED, 'hex');

const boomerangSigner = {

  getSignature: async (businessAddress, userAddress) => {

    console.log('businessAddress: ' + businessAddress);
    console.log('userAddress: ' + userAddress);

    let nonceValue = await getNonceValueForNewRating(businessAddress, userAddress);
    console.log('nonceValue: ' + nonceValue);

    const message = ethAbi.soliditySHA3(
      [ 'address', 'uint256' ],
      [ userAddress, nonceValue ]);
    console.log('message: ' + ethUtil.bufferToHex(message));

    // adds the "x19Ethereum Signed Message:\n32" prefix
    const messageHash = ethUtil.hashPersonalMessage(message);
    console.log('messageHash: ' + ethUtil.bufferToHex(messageHash));


    const privateKey = new Buffer(privateKeyOfTheBusiness, 'hex');
    const signature = ethUtil.ecsign(messageHash, privateKey);

    const recoveredAddress = ethUtil.publicToAddress(ethUtil.ecrecover(messageHash, signature.v, signature.r, signature.s));
    console.log('recovered address: ' + ethUtil.bufferToHex(recoveredAddress));

    return signature;
  }
};

async function getNonceValueForNewRating(businessAddressArg, userAddressArg) {

  return new Promise(async function(resolve, reject) {

    const axiosClient = await axios.create({
      baseURL: 'https://z6iwp9j5e3.execute-api.us-east-1.amazonaws.com/dev'
    });

    axiosClient.get('/getNonceValueForNewRating', {

      params: {
        businessAddress: businessAddressArg,
        userAddress: userAddressArg
      }
    })
      .then((response) => {
        return resolve(response.data.nonce);
      }).catch((error) => {
      console.log('error getting nonce for new rating: ' + error);
      return reject(error);
    });
  });
}

module.exports = boomerangSigner;