const Web3 = require('web3');

const Web3WsProvider = require('web3-providers-ws');
const options = { timeout: 30000 };
const websocketProvider = new Web3WsProvider('wss://ropsten.infura.io/ws', options);

// $ ipconfig getifaddr en0
//   10.1.10.39
// const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://10.1.10.39:8545'));
// const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'));
// const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'));
const web3 = new Web3(websocketProvider);

export default web3;