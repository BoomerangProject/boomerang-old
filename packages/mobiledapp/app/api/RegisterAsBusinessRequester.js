import axios from "axios";
import web3 from "../services/Web3HttpService";

axios.defaults.baseURL = 'https://eok6kkf6l6.execute-api.us-east-1.amazonaws.com/dev';

export default class RegisterAsBusinessRequester {

  async makeRequest(businessAccountAddress, businessName, businessDescription) {

    let response;

    try {
      response = await this.getSignedTransaction(businessAccountAddress, businessName, businessDescription);
    } catch (error) {
      console.log(error);
      return new Promise((resolve, reject) => {reject(error);});
    }

    let receipt;

    try {
      receipt = await this.sendSignedTransaction(response.data.signedTransaction);
    } catch (error) {
      console.log(error);
      return new Promise((resolve, reject) => {reject(error);});
    }

    return new Promise((resolve, reject) => {resolve(receipt);});
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

      web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
        .on('transactionHash', (transactionHash) => {
          console.log('transactionHash: ' + transactionHash)
        })
        .on('receipt', (receipt) => {
          console.log('receipt: ' + JSON.stringify(receipt))
        })
        .on('confirmation', (confirmationNumber, receipt) => {
          console.log("confirmation number: " + confirmationNumber);
          // console.log("the receipt is " + receipt);

          if (confirmationNumber > 5) {
            resolve(receipt);
          }
        })
        .on('error', (error) => {
          reject(error);
          console.log('web3 error: ' + error);
        });
    });
  }

  async cancel() {

  }
}