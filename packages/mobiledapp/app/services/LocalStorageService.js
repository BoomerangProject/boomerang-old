import { default as localStorage } from 'react-native-sensitive-info';
import web3 from "../services/Web3HttpService";

export function storeSeed(seedArg) {

  localStorage.setItem("kudosAccountSeed", seedArg, {
    keychainService: 'kudosKeychain',
    encrypt: true
  });

  const account = web3.eth.accounts.privateKeyToAccount(seedArg);

  localStorage.setItem("kudosAccountAddress", account.address, {
    keychainService: 'kudosKeychain',
    encrypt: true
  });
}

export function setItem(value) {

}

export function getItem(key) {

}

