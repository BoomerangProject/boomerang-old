import web3 from './Web3HttpService';
import { kudosTokenContractAddress } from '../ContractAddresses';

const KudosTokenContractJson = require("kudos-token-contract-objects/KudosToken");
const kudosTokenContract = new web3.eth.Contract(KudosTokenContractJson.abi, kudosTokenContractAddress);

export default kudosTokenContract;