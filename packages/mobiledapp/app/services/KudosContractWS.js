import { kudosContractAddress } from '../ContractAddresses';
import { web3WebsocketsProvider } from '../Endpoints';

export default async function getKudosContract() {

  const Web3 = require('web3');
  const Web3WsProvider = require('web3-providers-ws');
  const KudosContractJson = require('kudos-contract-objects/Kudos');

  const options = {timeout: 30000};
  const websocketProvider = new Web3WsProvider(web3WebsocketsProvider, options);

  const web3 = new Web3(websocketProvider);

  let kudosContract = new web3.eth.Contract(KudosContractJson.abi, kudosContractAddress);
  return kudosContract;
}
