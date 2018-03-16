'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
require('dotenv').config();
var WalletProvider = require("truffle-wallet-provider");
var Wallet = require('ethereumjs-wallet');

var privateKey = new Buffer(process.env.ROPSTEN_PRIVATE_KEY, "hex");
var wallet = Wallet.fromPrivateKey(privateKey);

var provider = new WalletProvider(wallet, "https://ropsten.infura.io/" + process.env.INFURA_ACCESS_TOKEN);
// const provider = new WalletProvider(wallet, "http://localhost:8545");

exports.default = provider;