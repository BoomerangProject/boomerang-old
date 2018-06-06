import { kudosContractAddress } from '../ContractAddresses';

export default async function getKudosContract() {

  const Web3 = require('web3');
  const KudosContractJson = require("kudos-contract-objects/Kudos");
  // const httpProvider = new Web3.providers.HttpProvider('https://ropsten.infura.io/2wx4womFMFUEyRBJKbKq');
  const httpProvider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/2wx4womFMFUEyRBJKbKq');
  const web3 = new Web3(httpProvider);

  let kudosContract = new web3.eth.Contract(KudosContractJson.abi, kudosContractAddress);
  return kudosContract;
}