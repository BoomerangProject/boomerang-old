import { kudosTokenContractAddress } from '../ContractAddresses';
import { web3HttpProvider} from '../Endpoints';

export default async function getKudosTokenContract() {

  const Web3 = require('web3');
  const KudosTokenContractJson = require('kudos-token-contract-objects/KudosToken');
  const httpProvider = new Web3.providers.HttpProvider(web3HttpProvider);
  const web3 = new Web3(httpProvider);

  let kudosTokenContract = new web3.eth.Contract(KudosTokenContractJson.abi, kudosTokenContractAddress);
  return kudosTokenContract;
}