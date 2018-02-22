import SimpleContractJson from '../ethereum/build/contracts/SimpleContract.json'
import contract from 'truffle-contract'

const WalletProvider = require("truffle-wallet-provider");
const Wallet = require('ethereumjs-wallet');

const privateKey = new Buffer(process.env.REACT_APP_ROPSTEN_PRIVATE_KEY, "hex");
const wallet = Wallet.fromPrivateKey(privateKey);
// const provider = new WalletProvider(wallet, "https://ropsten.infura.io/" + process.env.REACT_APP_INFURA_ACCESS_TOKEN);
const provider = new WalletProvider(wallet, "http://localhost:8545");

class SimpleContractOld {

  simpleContract;

  constructor () {

    if (!SimpleContract.instance) {

      SimpleContract.instance = this;

      this.initialize();
    }

    return SimpleContract.instance;
  }

  async initialize() {

    const simpleContractClass = contract(SimpleContractJson);
    simpleContractClass.setProvider(provider);
    this.simpleContract = await simpleContractClass.deployed();
  }

  getValue() {

    this.simpleContract.myValue().then((value) => {

      return value;
    });
  }
  // Properties & Methods
}

const instance = new SimpleContractOld();
// Object.freeze(instance);
export default instance;

