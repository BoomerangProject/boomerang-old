import { default as localStorage } from 'react-native-sensitive-info';
import web3 from '../services/Web3HttpService';

export async function storeSeed(seedArg) {

  await setItem('boomerangAccountSeed', seedArg);

  const account = await web3.eth.accounts.privateKeyToAccount('0x' + seedArg);

  await setItem('boomerangAccountAddress', account.address);
  console.log('boomerangAccountAddress: ' + account.address);

  return account.address;
}

export async function setItem(key, value) {

  return localStorage.setItem(key, value, {
    keychainService: 'boomerangKeychain',
    encrypt: true
  });
}

export async function getItem(key) {

  return localStorage.getItem(key, {
    keychainService: 'boomerangKeychain'
  });
}

export async function deleteItem(key) {

  return localStorage.deleteItem(key, {
    keychainService: 'boomerangKeychain'
  });
}

export async function getArrayItem(key) {

  const value = await localStorage.getItem(key, {
    keychainService: 'boomerangKeychain'
  });

  return JSON.parse(value);
}

export async function isLoggedIn() {

  const value = await getItem('isLoggedIn');
  return (value === 'true');
}

export async function logOut() {

  await deleteItem('boomerangAccountSeed');
  await deleteItem('boomerangAccountAddress');
  await setItem('isLoggedIn', 'false');
}
