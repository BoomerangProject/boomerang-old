import backoff from 'backoff';
import kudosTokenContract from '../../services/KudosTokenContractService';
import web3 from "../../services/Web3HttpService";

export default class KudosBalanceRequester {

  async makeRequest(addressArg) {

    return new Promise((resolve, reject) => {

      this.call = backoff.call(kudosTokenContract.methods.balanceOf(addressArg).call, (error, result) => {

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