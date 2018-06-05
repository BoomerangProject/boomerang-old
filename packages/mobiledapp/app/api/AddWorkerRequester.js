import axios from "axios";
import web3 from "../services/Web3HttpService";
import { NativeEventEmitter } from 'react-native';
import PendingTransactionCount from "../util/PendingTransactionCount";

axios.defaults.baseURL = 'https://eok6kkf6l6.execute-api.us-east-1.amazonaws.com/dev';


export default class AddWorkerRequester {

  constructor(workerAddress, businessAddress) {
    this.workerAddress = workerAddress;
    this.businessAddress = businessAddress;
  }

  async makeRequest() {

    let response;

    try {
      response = await this.getSignedTransaction(this.workerAddress, this.businessAddress);
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

      return axios.post('/addWorker', {

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

        PendingTransactionCount.increment();
        return resolve(transactionHash);
      })
        .on('confirmation', (confirmationNumber, receipt) => {

          if (confirmationNumber > 5) {
            PendingTransactionCount.decrement();
            promiEvent.off('confirmation');
          }
        })
        .once('error', (error) => {
          console.log('web3 error: ' + error);
          return reject(error);
        });
    });
  }

  async cancel() {

  }
}