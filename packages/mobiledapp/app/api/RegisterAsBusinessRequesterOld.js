import backoff from "backoff";
import web3 from "../services/Web3HttpService";
import kudosContract from "../services/KudosContractService";
import { default as localStorage } from 'react-native-sensitive-info';

export default class RegisterAsBusinessRequesterOld {

  async makeRequest(addressArg) {

    const privateKey = await localStorage.getItem('kudosAccountSeed', {
      keychainService: 'kudosKeychain'
    });

    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    console.log("private key: " + account.privateKey);
    console.log("account address: " + account.address);


    const query = kudosContract.methods.registerAsBusiness(addressArg);
    const encodedABI = query.encodeABI();
    const tx = {
      from: "0xdcee2f1da7262362a962d456280a928f4f90bb5e",
      to: "0xe28e955a6e6cb657114f2a9a3fc62c39455933c2",
      gas: 4612388,
      data: encodedABI,
    };


    const privateKeyOfPayer = '0x4725d5a1c46923e72f04831eab9daf1ec657f256f5e4f139d4835b5197fcffc4';
    const signedTransaction = await web3.eth.accounts.signTransaction(tx, privateKeyOfPayer);

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

      // this.call = backoff.call(web3.eth.sendSignedTransaction(signedTransaction.rawTransaction).on('confirmation', function(confNumber, receipt){ console.log("confirmation number: " + confirmationNumber); }), {}, (error, result) => {
      //
      //   if (error) {
      //     return reject(error);
      //   } else {
      //     return resolve(result);
      //   }
      // });
      //
      // this.call.setStrategy(new backoff.ExponentialStrategy());
      // this.call.failAfter(12);
      // this.call.start();
    });
  }

  async onConfirmation(confirmationNumber, receipt) {

    console.log();
    console.log("confirmation number: " + confirmationNumber);
  }

  async cancel() {

    if (this.call == undefined || this.call.abort == undefined) {
      return;
    }

    this.call.abort();
  }
}