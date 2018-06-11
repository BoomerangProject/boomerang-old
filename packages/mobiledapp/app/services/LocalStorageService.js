import { default as localStorage } from 'react-native-sensitive-info';
import web3 from "../services/Web3HttpService";

export function storeSeed(seedArg) {

  localStorage.setItem("kudosAccountSeed", seedArg, {
    keychainService: 'kudosKeychain',
    encrypt: true
  });

  const account = web3.eth.accounts.privateKeyToAccount('0x' + seedArg);

  localStorage.setItem("kudosAccountAddress", account.address, {
    keychainService: 'kudosKeychain',
    encrypt: true
  });
}

export async function setItem(key, value) {

  return localStorage.setItem(key, value, {
    keychainService: 'kudosKeychain',
    encrypt: true
  });
}

export async function getItem(key) {

  return localStorage.getItem(key, {
    keychainService: 'kudosKeychain'
  });
}

export async function getArrayItem(key) {

  const value = await localStorage.getItem(key, {
    keychainService: 'kudosKeychain'
  });

  return JSON.parse(value);
}

