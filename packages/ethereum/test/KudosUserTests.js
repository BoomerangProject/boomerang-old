const BigNumber = web3.BigNumber;
const util = require('ethereumjs-util');
const Web3Utils = require('web3-utils');
const bs58 = require('bs58');
const conv = require('binstring');

const soliditySha3 = Web3Utils.soliditySha3;

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Kudos = artifacts.require("Kudos");

contract("kudosUserTests", function([deployerAddress, businessAddress, workerAddress, userAddress]) {

  let kudos;

  beforeEach(async function() {

    // kudos = await Kudos.new();
    kudos = await Kudos.at('0x59f7e5cea0beb5cb90ac263b1c3123b0acceda4f');
  });

  class Signature {
    constructor(nonce, signer) {
      const message = soliditySha3(nonce);
      const sig = web3.eth.sign(signer, message, {from: signer});
      const res = util.fromRpcSig(sig);
      this.v = res.v;
      this.r = "0x" + res.r.toString("hex");
      this.s = "0x" + res.s.toString("hex");
    }
  }

  function signNonce(nonce, signer) {
    return new Signature(nonce, signer);
  }

  // https://ethereum.stackexchange.com/questions/17094/how-to-store-ipfs-hash-using-bytes#17112

  // IPFS hash is actually two concatenated pieces
  // 1. multihash identifier, so the first two bytes indicate the hash function being used (0x12 is sha2)
  // 2. the size (0x20 is 256-bits long)

  // we are removing "1220" from the beginning of the string
  function ipfsHashInBytes(ipfsHash) {
    console.log(conv(bs58.decode(ipfsHash), { out:'hex' }).slice(4));
    return "0x" + conv(bs58.decode(ipfsHash), { out:'hex' }).slice(4);
  }

  it("put reviews", async function() {

    const v = 1;
    const r = 2;
    const s = 3;

    const userId = "myUserId";
    const myUserAddress = "0xfe996c9a9b7f29580c6b9ab92fc692065bf25f80";
    const myWorkerAddress = "0x11c56a8b60a10323eb4402d698f9f97a0260d3d9";
    const myBusinessAddress = "0xd0a287acbc9b2b4222c5ea38dc0f8f1031b0e5ce";

    const ipfsHashes = [

      "QmUtcVd69mZ2X4L4SKGvyygyZGH6sMaVbyCUm8TS4EEyre",
      "QmTVbG3BQofEK1rA5aJhX7N948LwiaunQeTxtqD8KKzScZ",
      "QmcX6Q2jDhCA1w3ozR4risKUJaWFUKDgBvsYzbGfnuNW7m",
      "QmRppfBc19fp81ZioiM2Q3Vt9Viff4pyH4eDEB8sGFk8Yv"
    ];


    for (let i = 0; i < ipfsHashes.length; i++) {

      await kudos.rateExperience( myUserAddress,
        v, r, s, userId.toString("hex"),
        myBusinessAddress,
        3,
        myWorkerAddress,
        5,
        ipfsHashInBytes(ipfsHashes[i]),
        {from: deployerAddress});

    }
  });

  // it("user should be able to rate worker with signature", async function() {
  //
  //   var signature = signNonce(0, businessAddress);
  //
  //   await kudos.rateExperience( signature.v,
  //                               signature.r,
  //                               signature.s,
  //                               businessAddress,
  //                               5,
  //                               workerAddress,
  //                               5,
  //                               ipfsHashInBytes("QmdXuenGKXGmSBdFZdfWqcHzZuDKiQ8eUZ1h5ZQHGNdVLy"),
  //                               {from: userAddress});
  // });
});


// function rateExperience(  address _userAddress,
//   uint8 _v, bytes32 _r, bytes32 _s, bytes32 _userId,
//   address _businessAddress,
//   uint256 _businessRating,
//   address _workerAddress,
//   uint256 _workerRating,
//   bytes32 _transactionHash)