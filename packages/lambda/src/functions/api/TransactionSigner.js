import web3 from "../../services/Web3HttpService";
import kudosContract from "../../services/KudosContractService";
import { kudosContractAddress, payerAddress } from '../../ContractAddresses';

const privateKeyOfPayer = '0x4725d5a1c46923e72f04831eab9daf1ec657f256f5e4f139d4835b5197fcffc4';

let signTransaction = async (apiMethod, apiMethodParameters) => {

  console.log('apiMethod: ' + apiMethod);
  console.log('apiMethodParameters: ' + apiMethodParameters.toString());

  const query = kudosContract.methods[apiMethod](...apiMethodParameters);
  const encodedABI = query.encodeABI();

  const transaction = {
    from: payerAddress,
    to: kudosContractAddress,
    gas: 4612388,
    gasPrice: 80000000000,
    data: encodedABI
  };

  const signedTransaction = await web3.eth.accounts.signTransaction(transaction, privateKeyOfPayer);

  return signedTransaction;
};

export default signTransaction;