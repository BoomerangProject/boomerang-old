import web3 from './Web3HttpService';
import kudosContractAddress from '../../../KudosContractAddress';

const KudosContractJson = require("kudos-contract-objects/Kudos");
const kudosContract = new web3.eth.Contract(KudosContractJson.abi, kudosContractAddress);

export default kudosContract;