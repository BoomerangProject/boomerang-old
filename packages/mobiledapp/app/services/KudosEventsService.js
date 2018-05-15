import web3 from './Web3WebsocketsService.js';
import kudosContractAddress from '../../../KudosContractAddress';

const KudosContractJson = require("kudos-contract-objects/Kudos");
const kudosContract = new web3.eth.Contract(KudosContractJson.abi, kudosContractAddress);

export default async function getEvents(name, filter) {

  return new Promise((resolve, reject) => {

    kudosContract.getPastEvents(name, {
        filter: filter,
        fromBlock: 0,
        toBlock: 'latest'
      }, function(error, events) {

        if (error) {
          console.log(error.toString());
          return reject(error);
        }
      }
    ).then((events) => {
      return resolve(events);
    });
  });
}

