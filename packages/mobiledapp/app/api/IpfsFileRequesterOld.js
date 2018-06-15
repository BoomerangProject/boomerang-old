import axios from 'axios';
import { ipfsNodeEndpoint } from '../Endpoints';

export default class IpfsFileRequester {

  async makeRequest(ipfsHash) {

    return new Promise((resolve, reject) => {

      const axiosClient = axios.create({
        baseURL: ipfsNodeEndpoint
      });

      axiosClient.get(`/ipfs/${ipfsHash}`)
        .then(function(response) {
          return resolve(response.data);
        }).catch(function(error) {
          return reject(error);
        });
    });
  }

  async cancel() {
  }
}





