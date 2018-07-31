import web3 from './Web3HttpService';
import { boomerangContractAddress } from '../ContractAddresses';

const BoomerangContractJson = require('boomerang-contract-objects/Boomerang');
const boomerangContract = new web3.eth.Contract(BoomerangContractJson.abi, boomerangContractAddress);

export default boomerangContract;