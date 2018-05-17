import backoff from 'backoff';
import {default as getKudosContract} from '../services/KudosContractWS';

export default class KudosEventsRequester {

  async makeRequest(name, filter) {

    let kudosContract = await getKudosContract();

    return new Promise((resolve, reject) => {

      this.call = backoff.call(kudosContract.getPastEvents.bind(kudosContract), name, this.filterObject(filter), (error, result) => {

        if (error) {
          return reject(error);
        } else {
          return resolve(result);
        }
      });

      this.call.on('backoff', async (number, delay) => {
        console.log(number + ' ' + delay + 'ms');
        let kudosContract = await getKudosContract();
        this.call.function_ = kudosContract.getPastEvents.bind(kudosContract);
      });

      this.call.setStrategy(new backoff.ExponentialStrategy());
      this.call.failAfter(12);
      this.call.start();
    });
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





