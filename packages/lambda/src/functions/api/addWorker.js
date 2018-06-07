'use strict';
import errorResponse from "../../responses/errorResponse";
import signedTransactionResponse from "../../responses/smartContractReceiptResponse";

import web3 from "../../services/Web3HttpService";
import kudosContract from "../../services/KudosContractService";
import { kudosContractAddress, payerAddress } from '../../ContractAddresses';
import { getEthereumNonce } from '../../EthereumNonce';


const privateKeyOfPayer = '0x4725d5a1c46923e72f04831eab9daf1ec657f256f5e4f139d4835b5197fcffc4';

const getWorkerAddress = function(event) {

  const jsonBody = JSON.parse(event.body);
  return jsonBody.workerAddress;
};

const getBusinessAddress = function(event) {

  const jsonBody = JSON.parse(event.body);
  return jsonBody.businessAddress;
};

export default async (event, context, callback) => {

  const workerAddress = getWorkerAddress(event);
  const businessAddress = getBusinessAddress(event);

  let signedTransaction;
  try {

    const query = kudosContract.methods.addWorker(workerAddress, businessAddress);
    const encodedABI = query.encodeABI();
    const transaction = {
      from: payerAddress,
      to: kudosContractAddress,
      gas: 4612388,
      gasPrice: 80000000000,
      data: encodedABI
    };

    signedTransaction = await web3.eth.accounts.signTransaction(transaction, privateKeyOfPayer);

  } catch (error) {
    return callback(null, errorResponse('problem with signing transaction: ' + error));
  }

  callback(null, signedTransactionResponse(signedTransaction));
};