const Web3 = require('web3');

// $ ipconfig getifaddr en0
//   10.1.10.39

var Web3WsProvider = require('web3-providers-ws');
var options = { timeout: 30000 };
var websocketProvider = new Web3WsProvider('wss://ropsten.infura.io/ws', options);


// const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://10.1.10.39:8545'));
// const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'));
// const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'));
const web3 = new Web3(websocketProvider);

const KudosContractJson = require("kudos-contract-objects/Kudos");
const kudosContract = new web3.eth.Contract(KudosContractJson.abi, "0x59f7e5cea0beb5cb90ac263b1c3123b0acceda4f");

export default kudosContract;