import web3 from './Web3HttpService';

const KudosContractJson = require("kudos-contract-objects/Kudos");
const kudosContract = new web3.eth.Contract(KudosContractJson.abi, "0x0576086e929976fe1E3d54146964000d7D752c64");

export default kudosContract;