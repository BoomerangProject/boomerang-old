import backoff from 'backoff';
import web3 from "../services/Web3HttpService";

export default class EtherBalanceRequester {

  async makeRequest(addressArg) {

    return new Promise((resolve, reject) => {

      this.call = backoff.call(web3.eth.getBalance, addressArg, (error, result) => {

        if (error) {
          return reject(error);
        } else {
          return resolve(web3.utils.fromWei(result, 'ether'));
        }
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