import backoff from 'backoff';
import getBoomerangTokenContract from '../../services/BoomerangTokenContract';

export default class BoomerangTokenReadRequester {

  constructor(apiMethod, apiMethodParameters) {

    this.apiMethod = apiMethod;
    this.apiMethodParameters = apiMethodParameters;
  }

  async makeRequest() {

    let boomerangTokenContract = await getBoomerangTokenContract();

    return new Promise((resolve, reject) => {

      this.call = backoff.call(boomerangTokenContract.methods[this.apiMethod](...this.apiMethodParameters).call, (error, result) => {

        if (error) {
          console.log('error with BoomerangTokenReadRequester: ' + error);
          return reject(error);
        } else {
          return resolve(result);
        }
      });

      this.call.on('backoff', async (number, delay) => {
        console.log(number + ' ' + delay + 'ms');
        let boomerangTokenContract = await getBoomerangTokenContract();
        this.call.function_ = boomerangTokenContract.methods[this.apiMethod](...this.apiMethodParameters).call;
      });

      this.call.setStrategy(new backoff.ExponentialStrategy());
      this.call.failAfter(12);
      this.call.start();
    });
  }

  async cancel() {

    if (this.call == undefined || this.call.abort == undefined) {
      return;
    }

    this.call.abort();
  }
}