import web3 from "../../services/Web3HttpService";
import { payerAddress } from "./ContractAddresses";

export async function getEthereumNonce() {

  const numberOfMinedTransactions = web3.eth.getTransactionCount(payerAddress);
  const numberOfPendingTransactions = web3.eth.getTransactionCount(payerAddress, 'pending');

  return numberOfMinedTransactions + numberOfPendingTransactions;
}