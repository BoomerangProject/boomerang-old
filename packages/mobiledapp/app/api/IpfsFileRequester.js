import axios from 'axios';
import { ipfsNodeEndpoint } from '../Endpoints';
import KudosEventsRequester from './KudosEventsRequester';
import bs58 from 'bs58';

export default class IpfsFileRequester {

  constructor(eventName, filterObject) {
    this.kudosEventsRequester = new KudosEventsRequester();
    this.eventName = eventName;
    this.filterObject = filterObject;
  }

  async makeRequest() {

    const ipfsHash = await this.getIpfsHash();

    if (ipfsHash == undefined) {
      return;
    }

    const file = await this.getFileFromIpfsNode(ipfsHash);
    return file;
  }

  async getIpfsHash() {

    return new Promise(async (resolve, reject) => {

      let events;
      try {
        events = await this.kudosEventsRequester.makeRequest(this.eventName, this.filterObject);
      } catch (error) {
        console.log('problem getting ipfs hash: ' + error);
        return reject(error)
      }

      // console.log('these are the events: \n\n' + JSON.stringify(events));

      if (events == undefined || events.length < 1) {
        return;
      }

      const event = events[0];
      const ipfsHash = this.getIpfsHashFromBytes(event);
      return resolve(ipfsHash);
    });
  }

  getIpfsHashFromBytes(event) {

    // console.log('this is the event: \n\n' + JSON.stringify(event));

    const ipfsHash = '1220' + event.returnValues._ipfsHash.slice(2);
    const bytes = Buffer.from(ipfsHash, 'hex');
    return bs58.encode(bytes);
  };

  async getFileFromIpfsNode(ipfsHash) {

    return new Promise(async (resolve, reject) => {

      const axiosClient = await axios.create({
        baseURL: ipfsNodeEndpoint
      });

      axiosClient.get(`/ipfs/${ipfsHash}`)
        .then((response) => {
          return resolve(response.data);
        }).catch((error) => {
          console.log('problem getting file from ipfs node: ' + error);
          return reject(error);
        });
    });
  }
}





