'use strict';
import IPFS from "ipfs-mini";

const ipfs = new IPFS({host: 'ec2-54-172-136-192.compute-1.amazonaws.com', port: 5001, protocol: 'http'});

let storeToIpfs = async (ipfsObject) => {

  return new Promise(function(resolve, reject) {

    ipfs.addJSON(ipfsObject, function(error, result) {

      if (error) {
        console.log(error);
        return reject(error);
      }

      return resolve(result);
    });
  });
};

export default storeToIpfs;