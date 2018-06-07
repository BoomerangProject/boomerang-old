// See <http://truffleframework.com/docs/advanced/configuration> to customize your Truffle configuration!
require('dotenv').config();
const WalletProvider = require("truffle-wallet-provider");
const Wallet = require('ethereumjs-wallet');
const privateKey = new Buffer(process.env.ROPSTEN_PRIVATE_KEY, "hex");
const wallet = Wallet.fromPrivateKey(privateKey);

module.exports = {

  networks: {

    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },

    ropsten: {
      provider: new WalletProvider(wallet, "https://ropsten.infura.io/" + process.env.INFURA_ACCESS_TOKEN),
      network_id: "3",
      gas: 4612388,
      gasPrice: 80000000000
    },

    rinkeby: {
      provider: new WalletProvider(wallet, "https://rinkeby.infura.io/" + process.env.INFURA_ACCESS_TOKEN),
      network_id: "4",
      gas: 4612388,
      gasPrice: 80000000000
    },

    kovan: {
      provider: new WalletProvider(wallet, "https://kovan.infura.io/" + process.env.INFURA_ACCESS_TOKEN),
      network_id: "42",
      gas: 4612388,
      gasPrice: 80000000000
    }
  }
};
