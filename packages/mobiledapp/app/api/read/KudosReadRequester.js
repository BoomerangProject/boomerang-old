import backoff from 'backoff';
import getKudosContract from '../../services/KudosContract';

export default class KudosReadRequester {

  constructor(apiMethod, apiMethodParameters) {

    this.apiMethod = apiMethod;
    this.apiMethodParameters = apiMethodParameters;
  }

  async makeRequest() {

    let kudosContract = await getKudosContract();

    return new Promise((resolve, reject) => {

      this.call = backoff.call(kudosContract.methods[this.apiMethod](...this.apiMethodParameters).call, (error, result) => {

        if (error) {
          console.log('error with KudosReadRequester: ' + error);
          return reject(error);
        } else {
          return resolve(result);
        }
      });

      this.call.on('backoff', async (number, delay) => {
        console.log(number + ' ' + delay + 'ms');
        let kudosContract = await getKudosContract();
        this.call.function_ = kudosContract.methods[this.apiMethod](...this.apiMethodParameters).call;
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