import { kudosContractAddress } from '../ContractAddresses';
import { web3HttpProvider} from '../Endpoints';

export default async function getKudosContract() {

  const Web3 = require('web3');
  const KudosContractJson = require('kudos-contract-objects/Kudos');
  const httpProvider = new Web3.providers.HttpProvider(web3HttpProvider);
  const web3 = new Web3(httpProvider);

  let kudosContract = new web3.eth.Contract(KudosContractJson.abi, kudosContractAddress);
  return kudosContract;
}