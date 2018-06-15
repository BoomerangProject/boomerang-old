import { setItem, getItem } from '../services/LocalStorageService';

export default class PendingTransactions {

  static add(transactionHash) {

    getItem('pendingTransactions').then((arg) => {

      let pendingTransactions;

      if (arg == undefined) {
        pendingTransactions = [];
      } else {
        pendingTransactions = JSON.parse(arg);
        pendingTransactions.push(transactionHash);
      }
      setItem('pendingTransactions', JSON.stringify(pendingTransactions));

      console.log('(adding ' + transactionHash + ')\nnumberOfPendingTransactions: ' + pendingTransactions.length);
    });
  }
  
  static remove(transactionHash) {

    getItem('pendingTransactions').then((arg) => {

      let pendingTransactions;

      if (arg == undefined) {
        pendingTransactions = [];
      } else {
        pendingTransactions = JSON.parse(arg);

        let index = pendingTransactions.indexOf(transactionHash);
        if (index > -1) {
          pendingTransactions.splice(index, 1);
        }
      }
      setItem('pendingTransactions', JSON.stringify(pendingTransactions));

      console.log('(removing ' + transactionHash + ')\nnumberOfPendingTransactions: ' + pendingTransactions.length);
    });
  }

  static init() {

    // TODO -- remove this, handle it by calling rest calls for the transactions stored, should be storing array of transaction hashes
    setItem('pendingTransactions', JSON.stringify([]));
  }
}
