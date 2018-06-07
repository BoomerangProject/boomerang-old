import axios from "axios";
import web3 from "../../services/Web3HttpService";
import { NativeEventEmitter } from 'react-native';
import PendingTransactionCount from "../../util/PendingTransactions";
import getKudosContract from "../../services/KudosContract";
import backoff from "backoff";
import { awsEndpoint } from "../../Endpoints";

export default class AddWorkerRequester {

  constructor(workerAddress, businessAddress) {
    this.workerAddress = workerAddress;
    this.businessAddress = businessAddress;
  }

  async makeRequest() {

    let response;

    try {
      response = await this.getSignedTransaction(this.workerAddress, this.businessAddress);
      console.log('nonceValue: ' + response.nonceValue);
    } catch (error) {
      console.log(error);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    let transactionHash;

    try {
      transactionHash = await this.sendSignedTransaction(response.data.signedTransaction);
    } catch (error) {
      console.log(error);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    return new Promise((resolve, reject) => {
      resolve(transactionHash);
    });
  }

  async getSignedTransaction(workerAddress, businessAddress) {

    return new Promise(function(resolve, reject) {

      const axiosClient = axios.create({
        baseURL: awsEndpoint
      });

      return axiosClient.post('/addWorker', {

        workerAddress: workerAddress,
        businessAddress: businessAddress

      }).then(function(response) {

        return resolve(response);

      }).catch(function(error) {
        console.log('axios error: ' + error);
        return reject(error);
      });
    });
  }

  async sendSignedTransaction(signedTransaction) {

    return new Promise((resolve, reject) => {

      const promiEvent = web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

      promiEvent.once('transactionHash', (transactionHash) => {

        PendingTransactionCount.add(transactionHash);
        return resolve(transactionHash);
      })
        .on('confirmation', (confirmationNumber, receipt) => {

          if (confirmationNumber > 5) {

            PendingTransactionCount.remove(receipt.transactionHash);
            promiEvent.off('confirmation');
          }
        })
        .once('error', (error) => {
          console.log('web3 error: ' + error);
          return reject(error);
        });
    });
  }


  // async sendSignedTransaction(signedTransaction) {
  //
  //   return new Promise((resolve, reject) => {
  //
  //     this.call = backoff.call(kudosContract.methods.isBusiness(addressArg).call, (error, result) => {
  //
  //       if (error) {
  //         return reject(error);
  //       } else {
  //         return resolve(result);
  //       }
  //     });
  //
  //     this.call.on('backoff', async (number, delay) => {
  //       console.log(number + ' ' + delay + 'ms');
  //       let kudosContract = await getKudosContract();
  //       this.call.function_ = kudosContract.getPastEvents.bind(kudosContract);
  //     });
  //
  //     this.call.setStrategy(new backoff.ExponentialStrategy());
  //     this.call.failAfter(12);
  //     this.call.start();
  //   });
  // }

  async cancel() {

  }
}