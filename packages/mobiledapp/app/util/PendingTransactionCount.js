import { default as localStorage } from 'react-native-sensitive-info';
import { NativeEventEmitter } from "react-native";

const eventName = 'numberOfPendingTransactions';

export default class PendingTransactionCount {

  static increment() {

    localStorage.getItem(eventName, {
      keychainService: 'kudosKeychain'
    }).then((arg) => {

      let numberOfPendingTransactions;

      if (arg == null) {
        numberOfPendingTransactions = 1;
      } else {
        numberOfPendingTransactions = parseInt(arg) + 1;
      }

      console.log("(increment) numberOfPendingTransactions: " + numberOfPendingTransactions);

      localStorage.setItem(eventName, numberOfPendingTransactions.toString(), {
        keychainService: 'kudosKeychain',
        encrypt: true
      });

      const eventEmitter = new NativeEventEmitter();
      eventEmitter.emit(eventName, numberOfPendingTransactions);
    });
  }

  static decrement() {


    localStorage.getItem(eventName, {
      keychainService: 'kudosKeychain'
    }).then((arg) => {

      let numberOfPendingTransactions;

      if (arg == null) {
        numberOfPendingTransactions = 0;
      } else {
        numberOfPendingTransactions = parseInt(arg) - 1;
      }

      console.log("(decrement) numberOfPendingTransactions: " + numberOfPendingTransactions);

      localStorage.setItem(eventName, numberOfPendingTransactions.toString(), {
        keychainService: 'kudosKeychain',
        encrypt: true
      });

      const eventEmitter = new NativeEventEmitter();
      eventEmitter.emit(eventName, numberOfPendingTransactions);
    });
  }

  static reset() {

    // TODO -- remove this, handle it by calling rest calls for the transactions stored, should be storing array of transaction hashes
    localStorage.setItem('numberOfPendingTransactions', '0', {
      keychainService: 'kudosKeychain',
      encrypt: true
    });
  }
}
