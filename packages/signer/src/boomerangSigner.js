import ethUtil from "ethereumjs-util";
import axios from "axios";

const privateKeyOfTheBusiness = '6898ca0044b4b85e9fae54ba2a64520fc5bc0183d3685569be4f56b98082c451';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const boomerangSigner = {

  getSignature: async (businessAddress, userAddress) => {

    let nonceValue = await getNonceValueForNewRating(businessAddress, userAddress);
    console.log('nonceValue: ' + nonceValue);
    // const nonceValue = 27031;
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

    const message = ethUtil.toBuffer(userAddress + nonceValue);
    console.log("message: " + ethUtil.bufferToHex(message));
    console.log("32?: " + message.length.toString());
    const messageHash = ethUtil.hashPersonalMessage(message);
    console.log("messageHash: " + ethUtil.bufferToHex(messageHash));

    const privateKey = new Buffer(privateKeyOfTheBusiness, 'hex');
    const signature = ethUtil.ecsign(messageHash, privateKey);

//      bytes32 nonceHash = keccak256(abi.encodePacked(_userAddress, nonceValueForNewRating[_businessAddress][_userAddress]));
//      bytes memory prefix = '\x19Ethereum Signed Message:\n32';
//      bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, nonceHash));
//      address recoveredAddress = ecrecover(prefixedHash, _v, _r, _s);
//      require(recoveredAddress == _userAddress);

    const recoveredAddress = ethUtil.publicToAddress(ethUtil.ecrecover(messageHash, signature.v, signature.r, signature.s));
    console.log('recovered address: ' + ethUtil.bufferToHex(recoveredAddress));

    // console.log(ethUtil.publicToAddress(ethUtil.ecrecover(messageHash, 27, signature.r, signature.s)));
    // console.log(ethUtil.publicToAddress(ethUtil.ecrecover(messageHash, 28, signature.r, signature.s)));

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