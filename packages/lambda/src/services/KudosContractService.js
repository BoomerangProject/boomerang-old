import web3 from './Web3HttpService';

const KudosContractJson = require("kudos-contract-objects/Kudos");
const kudosContract = new web3.eth.Contract(KudosContractJson.abi, "0xe28e955a6e6cb657114f2a9a3fc62c39455933c2");

export default kudosContract;