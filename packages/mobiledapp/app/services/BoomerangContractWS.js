import { boomerangContractAddress } from '../ContractAddresses';
import { web3WebsocketsProvider } from '../Endpoints';

export default async function getBoomerangContract() {

  const Web3 = require('web3');
  const Web3WsProvider = require('web3-providers-ws');
  const BoomerangContractJson = require('boomerang-contract-objects/Boomerang');

  const options = {timeout: 30000};
  const websocketProvider = new Web3WsProvider(web3WebsocketsProvider, options);

  const web3 = new Web3(websocketProvider);

  let boomerangContract = new web3.eth.Contract(BoomerangContractJson.abi, boomerangContractAddress);
  return boomerangContract;
}
