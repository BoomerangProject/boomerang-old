import { boomerangTokenContractAddress } from '../ContractAddresses';
import { web3HttpProvider} from '../Endpoints';

export default async function getBoomerangTokenContract() {

  const Web3 = require('web3');
  const BoomerangTokenContractJson = require('boomerang-token-contract-objects/BoomerangToken');
  const httpProvider = new Web3.providers.HttpProvider(web3HttpProvider);
  const web3 = new Web3(httpProvider);

  let boomerangTokenContract = new web3.eth.Contract(BoomerangTokenContractJson.abi, boomerangTokenContractAddress);
  return boomerangTokenContract;
}