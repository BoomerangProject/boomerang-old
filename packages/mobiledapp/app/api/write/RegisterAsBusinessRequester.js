import axios from "axios";
import web3 from "../../services/Web3HttpService";
import { NativeEventEmitter } from 'react-native';
import PendingTransactionCount from "../../util/PendingTransactions";
import { awsEndpoint } from '../../Endpoints';

export default class RegisterAsBusinessRequester {

  constructor(businessAddress, businessName, businessDescription) {

    this.businessAddress = businessAddress;
    this.businessName = businessName;
    this.businessDescription = businessDescription;
  }

  async makeRequest() {

    let response;

    try {
      response = await this.getSignedTransaction(this.businessAddress, this.businessName, this.businessDescription);
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

  async getSignedTransaction(businessAddress, businessName, businessDescription) {

    const axiosClient = axios.create({
      baseURL: awsEndpoint
    });

    return new Promise(function(resolve, reject) {

      return axiosClient.post('/registerAsBusiness', {

        businessAddress: businessAddress,
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

  async cancel() {

  }
}