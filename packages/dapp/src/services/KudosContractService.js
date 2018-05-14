const Web3 = require('web3');
// const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'));
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'));

const KudosContractJson = require("kudos-contract-objects/Kudos");
const kudosContract = new web3.eth.Contract(KudosContractJson.abi, "0x0576086e929976fe1E3d54146964000d7D752c64");

export default kudosContract;