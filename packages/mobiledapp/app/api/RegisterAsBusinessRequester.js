import axios from "axios";
import web3 from "../services/Web3HttpService";
import IsBusinessRequester from './IsBusinessRequester';

axios.defaults.baseURL = 'https://eok6kkf6l6.execute-api.us-east-1.amazonaws.com/dev';

export default class RegisterAsBusinessRequester {

  async makeRequest(businessAccountAddress, businessName, businessDescription) {

    this.isBusinessRequester = new IsBusinessRequester();
    await this.checkBusinessStatus(businessAccountAddress);


    const response = await this.getSignedTransaction(businessAccountAddress, businessName, businessDescription);

    console.log('response');
    console.log('-----------------------');
    console.log(JSON.stringify(response));

    const receipt = await this.sendSignedTransaction(response.data.signedTransaction, businessAccountAddress);
    console.log('receipt');
    console.log('-----------------------');
    console.log(JSON.stringify(receipt));


    await this.checkBusinessStatus(businessAccountAddress);
  }

  async checkBusinessStatus(kudosAccountAddress) {

    let result;
    try {

      result = await this.isBusinessRequester.makeRequest(kudosAccountAddress);

      console.log("isBusiness for " + kudosAccountAddress + ": " + result);
    } catch (error) {

      console.log(error);
    }
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

  async sendSignedTransaction(signedTransaction, businessAccountAddress) {

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

          this.checkBusinessStatus(businessAccountAddress).then((isBusinessValue) => {
            console.log('confirmation #' + confirmationNumber + ': ' + isBusinessValue);
          });

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