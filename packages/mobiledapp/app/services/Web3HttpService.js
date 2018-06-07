const Web3 = require('web3');
import { web3HttpProvider } from '../Endpoints';

const httpProvider = new Web3.providers.HttpProvider(web3HttpProvider);
const web3 = new Web3(httpProvider);
export default web3;