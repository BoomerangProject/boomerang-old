const BigNumber = web3.BigNumber;
const util = require('ethereumjs-util');
const Web3Utils = require('web3-utils');
const bs58 = require('bs58');

const soliditySha3 = Web3Utils.soliditySha3;

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Kudos = artifacts.require("Kudos");

contract("kudosUserTests", function([deployer, business, worker, user]) {

  let kudos;

  beforeEach(async function() {

    kudos = await Kudos.new();
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

  function ipfsHashInBytes(ipfsHash) {
    return bs58.decode(ipfsHash).toString("hex").slice(4);
  }

  it("user should be able to rate worker with signature", async function() {

    var signature = signNonce(0, business);

    await kudos.rateExperience( signature.v,
                                signature.r,
                                signature.s,
                                business,
                                5,
                                worker,
                                5,
                                ipfsHashInBytes("QmdXuenGKXGmSBdFZdfWqcHzZuDKiQ8eUZ1h5ZQHGNdVLy"),
                                {from: user});
  });
});