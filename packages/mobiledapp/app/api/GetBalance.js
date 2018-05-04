import backoff from "backoff";
import web3 from "../services/Web3Service";

export default function getBalance() {

  return new Promise((resolve, reject) => {

    const exponentialBackoff = backoff.exponential({
      randomisationFactor: 0,
      initialDelay: 10,
      maxDelay: 30000
    });

    exponentialBackoff.failAfter(12);

    exponentialBackoff.on('backoff', function(number, delay) {
      console.log(number + ' ' + delay + 'ms');
    });

    exponentialBackoff.on('ready', (number, delay) => {
      web3.eth.getBalance("0xdcee2f1da7262362a962d456280a928f4f90bb5e")
        .then(() => {
          return resolve();
        })
        .catch((error) => {
          exponentialBackoff.backoff();
        });
    });

    exponentialBackoff.on('fail', function() {
      return reject();
    });

    exponentialBackoff.backoff();
  });
}