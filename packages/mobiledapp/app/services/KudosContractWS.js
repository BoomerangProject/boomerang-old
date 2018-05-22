import { kudosContractAddress } from '../ContractAddresses';

export default function kudosContract() {

  const Web3 = require('web3');
  const Web3WsProvider = require('web3-providers-ws');
  const KudosContractJson = require("kudos-contract-objects/Kudos");

  const options = {timeout: 30000};
  const websocketProvider = new Web3WsProvider('wss://ropsten.infura.io/ws', options);

  const web3 = new Web3(websocketProvider);

  let kudosContract = new web3.eth.Contract(KudosContractJson.abi, kudosContractAddress);
  return kudosContract;
}
