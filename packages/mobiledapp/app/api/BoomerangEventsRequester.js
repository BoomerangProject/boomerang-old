import backoff from 'backoff';
import getBoomerangContract from '../services/BoomerangContract';

export default class BoomerangEventsRequester {

  async makeRequest(name, filter) {

    let boomerangContract = await getBoomerangContract();

    return new Promise((resolve, reject) => {

      this.call = backoff.call(boomerangContract.getPastEvents.bind(boomerangContract), name, this.filterObject(filter), (error, result) => {

        if (error) {
          return reject(error);
        } else {
          return resolve(result);
        }
      });

      this.call.on('backoff', async (number, delay) => {
        console.log(number + ' ' + delay + 'ms');
        let boomerangContract = await getBoomerangContract();
        this.call.function_ = boomerangContract.getPastEvents.bind(boomerangContract);
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





