'use strict';
import errorResponse from "../../responses/errorResponse";
import signedTransactionResponse from "../../responses/smartContractReceiptResponse";

import web3 from "../../services/Web3HttpService";
import kudosContract from "../../services/KudosContractService";
import { kudosContractAddress } from '../../ContractAddresses';

const privateKeyOfPayer = '0x4725d5a1c46923e72f04831eab9daf1ec657f256f5e4f139d4835b5197fcffc4';
const accountAddressOfPayer = '0xdcee2f1da7262362a962d456280a928f4f90bb5e';

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
      from: accountAddressOfPayer,
      to: kudosContractAddress,
      gas: 4612388,
      data: encodedABI
    };

    signedTransaction = await web3.eth.accounts.signTransaction(transaction, privateKeyOfPayer);

  } catch (error) {
    return callback(null, errorResponse('problem with signing transaction: ' + error));
  }

  callback(null, signedTransactionResponse(signedTransaction));
};