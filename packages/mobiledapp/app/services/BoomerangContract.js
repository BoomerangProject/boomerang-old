import { boomerangContractAddress } from '../ContractAddresses';
import { web3HttpProvider} from '../Endpoints';

export default async function getBoomerangContract() {

  const Web3 = require('web3');
  const BoomerangContractJson = require('boomerang-contract-objects/Boomerang');
  const httpProvider = new Web3.providers.HttpProvider(web3HttpProvider);
  const web3 = new Web3(httpProvider);

  let boomerangContract = new web3.eth.Contract(BoomerangContractJson.abi, boomerangContractAddress);
  return boomerangContract;
}