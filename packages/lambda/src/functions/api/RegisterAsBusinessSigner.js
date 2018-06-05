import web3 from "../../services/Web3HttpService";
import kudosContract from "../../services/KudosContractService";
import ipfsHashInBytes from '../../util/IpfsHashStringToBytesConverter';
import { kudosContractAddress } from '../../ContractAddresses';

const privateKeyOfPayer = '0x4725d5a1c46923e72f04831eab9daf1ec657f256f5e4f139d4835b5197fcffc4';
const accountAddressOfPayer = '0xdcee2f1da7262362a962d456280a928f4f90bb5e';

let registerAsBusinessTransaction = async (accountAddress, ipfsHash) => {

  const query = kudosContract.methods.registerAsBusiness(accountAddress, ipfsHashInBytes(ipfsHash));
  const encodedABI = query.encodeABI();
  const transaction = {
    from: accountAddressOfPayer,
    to: kudosContractAddress,
    gas: 4612388,
    gasPrice: 80000000000,
    data: encodedABI
  };

  const signedTransaction = await web3.eth.accounts.signTransaction(transaction, privateKeyOfPayer);

  return signedTransaction;
};

export default registerAsBusinessTransaction;