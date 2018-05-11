import web3 from "../../services/Web3HttpService";
import kudosContract from "../../services/KudosContractService";

const privateKeyOfPayer = '0x4725d5a1c46923e72f04831eab9daf1ec657f256f5e4f139d4835b5197fcffc4';
const accountAddressOfPayer = '0xdcee2f1da7262362a962d456280a928f4f90bb5e';
const kudosContractAddress = '0xe28e955a6e6cb657114f2a9a3fc62c39455933c2';

let registerAsBusiness = async (accountAddress) => {

  const query = kudosContract.methods.registerAsBusiness(accountAddress);
  const encodedABI = query.encodeABI();
  const tx = {
    from: accountAddressOfPayer,
    to: kudosContractAddress,
    gas: 4612388,
    data: encodedABI
  };

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
  });
};

export default registerAsBusiness;