const Web3 = require('web3');
const httpProvider = new Web3.providers.HttpProvider('https://ropsten.infura.io/2wx4womFMFUEyRBJKbKq');
// const httpProvider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/2wx4womFMFUEyRBJKbKq');
const web3 = new Web3(httpProvider);
export default web3;