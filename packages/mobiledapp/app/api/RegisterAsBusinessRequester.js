import axios from "axios";
import web3 from "../services/Web3HttpService";
import { NativeEventEmitter } from 'react-native';
import PendingTransactionCount from "../util/PendingTransactionCount";

axios.defaults.baseURL = 'https://eok6kkf6l6.execute-api.us-east-1.amazonaws.com/dev';

export default class RegisterAsBusinessRequester {

  constructor(businessAccountAddress, businessName, businessDescription) {

    this.businessAccountAddress = businessAccountAddress;
    this.businessName = businessName;
    this.businessDescription = businessDescription;
  }

  async makeRequest() {

    let response;

    try {
      response = await this.getSignedTransaction(this.businessAccountAddress, this.businessName, this.businessDescription);
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

  async getSignedTransaction(businessAccountAddress, businessName, businessDescription) {

    return new Promise(function(resolve, reject) {

      return axios.post('/registerAsBusiness', {

        businessAccountAddress,
        businessName,
        businessDescription

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