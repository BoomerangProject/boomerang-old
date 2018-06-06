import web3 from "./services/Web3HttpService";
import { payerAddress } from "./ContractAddresses";

export async function getEthereumNonce() {

  const numberOfMinedTransactions = await web3.eth.getTransactionCount(payerAddress);
  const numberOfPendingTransactions = await web3.eth.getTransactionCount(payerAddress, 'pending');

  return numberOfMinedTransactions + numberOfPendingTransactions;
}