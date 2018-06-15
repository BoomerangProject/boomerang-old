import { default as localStorage } from 'react-native-sensitive-info';
import web3 from '../services/Web3HttpService';

export async function storeSeed(seedArg) {

  await setItem('kudosAccountSeed', seedArg);

  const account = await web3.eth.accounts.privateKeyToAccount('0x' + seedArg);

  await setItem('kudosAccountAddress', account.address);

  return account.address;
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

export async function deleteItem(key) {

  return localStorage.deleteItem(key, {
    keychainService: 'kudosKeychain'
  });
}

export async function getArrayItem(key) {

  const value = await localStorage.getItem(key, {
    keychainService: 'kudosKeychain'
  });

  return JSON.parse(value);
}

export async function isLoggedIn() {

  const value = await getItem('isLoggedIn');
  return (value === 'true');
}

export async function isUserAccount() {

  const value = await getItem('isUser');
  return (value === 'true');
}

export async function isWorkerAccount() {

  const value = await getItem('isWorker');
  return (value === 'true');
}

export async function isBusinessAccount() {

  const value = await getItem('isBusiness');
  return (value === 'true');
}

export async function clearSeed() {

  await deleteItem('kudosAccountSeed');
  await deleteItem('kudosAccountAddress');
  await setItem('isLoggedIn', 'false');
  await deleteItem('isUser');
  await deleteItem('isWorker');
  await deleteItem('isBusiness');
}
