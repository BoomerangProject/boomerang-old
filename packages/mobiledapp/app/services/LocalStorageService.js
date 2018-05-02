import ethUtil from "ethereumjs-util";
import { default as localStorage } from 'react-native-sensitive-info';

export function storeSeed(seedArg) {

  localStorage.setItem("kudosAccountSeed", seedArg, {
    keychainService: 'kudosKeychain',
    encrypt: true
  });

  const accountAddress = '0x' + ethUtil.privateToAddress(new Buffer(seedArg, "hex")).toString("hex");

  localStorage.setItem("kudosAccountAddress", accountAddress, {
    keychainService: 'kudosKeychain',
    encrypt: true
  });
}