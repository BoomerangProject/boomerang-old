import backoff from 'backoff';
import getBoomerangContract from '../../services/BoomerangContract';

export default class BoomerangReadRequester {

  constructor(apiMethod, apiMethodParameters) {

    this.apiMethod = apiMethod;
    this.apiMethodParameters = apiMethodParameters;
  }

  async makeRequest() {

    let boomerangContract = await getBoomerangContract();

    return new Promise((resolve, reject) => {

      this.call = backoff.call(boomerangContract.methods[this.apiMethod](...this.apiMethodParameters).call, (error, result) => {

        if (error) {
          console.log('error with BoomerangReadRequester: ' + error);
          return reject(error);
        } else {
          return resolve(result);
        }
      });

      this.call.on('backoff', async (number, delay) => {
        console.log(number + ' ' + delay + 'ms');
        let boomerangContract = await getBoomerangContract();
        this.call.function_ = boomerangContract.methods[this.apiMethod](...this.apiMethodParameters).call;
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