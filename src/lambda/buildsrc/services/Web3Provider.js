'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
require('dotenv').config();
const WalletProvider = require("truffle-wallet-provider");
const Wallet = require('ethereumjs-wallet');

const privateKey = new Buffer(process.env.ROPSTEN_PRIVATE_KEY, "hex");
const wallet = Wallet.fromPrivateKey(privateKey);

const provider = new WalletProvider(wallet, "https://ropsten.infura.io/" + process.env.INFURA_ACCESS_TOKEN);
// const provider = new WalletProvider(wallet, "http://localhost:8545");

exports.default = provider;