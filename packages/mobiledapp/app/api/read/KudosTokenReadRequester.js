import backoff from 'backoff';
import getKudosTokenContract from '../../services/KudosTokenContract';

export default class KudosTokenReadRequester {

  constructor(apiMethod, apiMethodParameters) {

    this.apiMethod = apiMethod;
    this.apiMethodParameters = apiMethodParameters;
  }

  async makeRequest() {

    let kudosTokenContract = await getKudosTokenContract();

    return new Promise((resolve, reject) => {

      this.call = backoff.call(kudosTokenContract.methods[this.apiMethod](...this.apiMethodParameters).call, (error, result) => {

        if (error) {
          console.log('error with KudosTokenReadRequester: ' + error);
          return reject(error);
        } else {
          return resolve(result);
        }
      });

      this.call.on('backoff', async (number, delay) => {
        console.log(number + ' ' + delay + 'ms');
        let kudosTokenContract = await getKudosTokenContract();
        this.call.function_ = kudosTokenContract.methods[this.apiMethod](...this.apiMethodParameters).call;
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