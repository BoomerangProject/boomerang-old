import backoff from 'backoff';
import {default as getKudosContract} from '../services/KudosContractWS';

export default class KudosEventsRequester {

  async makeRequest(name, filter) {

    return new Promise((resolve, reject) => {

      this.call = backoff.call(this.getPastEventsCall(), name, this.filterObject(filter), (error, result) => {

        if (error) {
          return reject(error);
        } else {
          return resolve(result);
        }
      });

      this.call.setStrategy(new backoff.ExponentialStrategy());
      this.call.failAfter(12);
      this.call.start();
    });
  }

  getPastEventsCall() {

    let kudosContract = getKudosContract();
    return kudosContract.getPastEvents.bind(kudosContract);
  }

  filterObject(filter) {
    return {
      filter: filter,
      fromBlock: 0,
      toBlock: 'latest'
    };
  }

  async cancel() {

    if (this.call == undefined || this.call.abort == undefined) {
      return;
    }

    this.call.abort();
  }
}





