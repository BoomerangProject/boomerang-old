require('babel-register');
require('babel-polyfill');

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
    coverage: {
      host: "localhost",
      network_id: "*",
      port: 8555,
      gas: 0xfffffffffff,
      gasPrice: 0x01
    },
    testnet: {
      host: "localhost",
      port: 8545,
      network_id: 4,
      // from: "0x4F3Da41D2adb81e8e3A808E865b55c68f163b81A", // primary testnet account
      from: "0xE702Ee34e8E4749F5cAB4AF574E458693dfC9575", // ledger wallet
      gas: 4612388
    },
    production: {
      host: "localhost",
      port: 8545,
      network_id: 1,
      from: "0x2FD3A13853161e19098437F8c61a5bB8FcE117f9", // ledger wallet
      gas: 4612388,
      gasPrice: 8000000000
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
