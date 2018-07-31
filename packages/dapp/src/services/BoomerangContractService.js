const Web3 = require('web3');
const boomerangContractAddress = require('../../../BoomerangContractAddress');

// const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'));
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'));

const BoomerangContractJson = require("boomerang-contract-objects/Boomerang");
const boomerangContract = new web3.eth.Contract(BoomerangContractJson.abi, boomerangContractAddress);

export default boomerangContract;