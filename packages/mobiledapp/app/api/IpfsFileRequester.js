import axios from 'axios';

export default class IpfsFileRequester {

  async makeRequest(ipfsHash) {

    return new Promise((resolve, reject) => {

      const axiosClient = axios.create({
        baseURL: 'http://ec2-54-172-136-192.compute-1.amazonaws.com:8080'
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





