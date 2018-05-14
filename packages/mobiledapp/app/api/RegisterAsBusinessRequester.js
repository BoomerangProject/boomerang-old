import axios from "axios";

axios.defaults.baseURL = 'https://eok6kkf6l6.execute-api.us-east-1.amazonaws.com/dev/registerAsBusiness';

export default class RegisterAsBusinessRequester {

  async makeRequest(addressArg) {

    const signedTransaction = await this.getSignedTransaction();
    const receipt = await this.sendSignedTransaction(signedTransaction);
    console.log('receipt');
    console.log('-----------------------');
    console.log(JSON.stringify(receipt));
  }

  async getSignedTransaction() {

  }

  async sendSignedTransaction(signedTransaction) {

    return new Promise((resolve, reject) => {

      web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
        .on('transactionHash', (transactionHash) => {
          // console.log('transactionHash: ' + transactionHash)
        })
        .on('receipt', (receipt) => {
          // console.log('receipt: ' + receipt)
        })
        .on('confirmation', (confirmationNumber, receipt) => {
          // console.log("confirmation number: " + confirmationNumber);
          // console.log("the receipt is " + receipt);

          if (confirmationNumber > 5) {
            resolve(receipt);
          }
        })
        .on('error', (error) => {
          reject(error);
          console.log(error);
        });
    });
  }
}