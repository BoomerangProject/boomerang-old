import web3 from '../../services/Web3HttpService';
import PendingTransactionCount from '../../util/PendingTransactions';
import backoff from 'backoff';
import axios from 'axios';
import { awsEndpoint } from '../../Endpoints';

export default class WriteRequester {

  constructor(apiMethod, apiMethodParameters) {

    this.apiMethod = apiMethod;
    this.apiMethodParameters = apiMethodParameters;
  }

  async makeRequest() {

    return new Promise((resolve, reject) => {

      const exponentialBackoff = backoff.exponential();

      exponentialBackoff.failAfter(10);

      exponentialBackoff.on('backoff', async (number, delay) => {
        console.log(number + ' ' + delay + 'ms');
      });

      exponentialBackoff.on('ready', async (number, delay) => {

        let response;

        try {
          response = await this.getSignedTransaction();
        } catch (error) {
          console.log('error getting the signed transaction\n\n' + error);
          exponentialBackoff.backoff();
          return;
        }

        let transactionHash;

        try {

          const promiEvent = web3.eth.sendSignedTransaction(response.data.signedTransaction.rawTransaction);

          promiEvent.once('transactionHash', (transactionHashValue) => {

            PendingTransactionCount.add(transactionHashValue);
            transactionHash = transactionHashValue;
            return resolve(transactionHash);
          })
            .on('confirmation', (confirmationNumber, receipt) => {

              if (confirmationNumber > 5) {
                PendingTransactionCount.remove(transactionHash);
                promiEvent.off('confirmation');
              }
            })
            .once('error', (error) => {
              console.log('error, transaction was not mined:\n\n' + error);
              PendingTransactionCount.remove(transactionHash);
              exponentialBackoff.backoff();
              return;
            });

        } catch (error) {
          console.log('problem sending signed transaction:\n\n' + error);
          exponentialBackoff.backoff();
          return;
        }
      });

      exponentialBackoff.on('fail', (error) => {
        console.log('exponentialBackoff failed:\n\n' + error);
        return reject(error);
      });

      exponentialBackoff.backoff();
    });
  }

  async getSignedTransaction() {

    const axiosClient = axios.create({
      baseURL: awsEndpoint
    });

    return new Promise((resolve, reject) => {

      return axiosClient.post(this.apiMethod, this.apiMethodParameters).then((response) => {
        return resolve(response);
      }).catch((error) => {
        console.log('axios error: ' + error);
        return reject(error);
      });
    });
  }

  async cancel() {

  }
}