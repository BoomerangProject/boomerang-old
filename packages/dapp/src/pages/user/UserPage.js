import React, { Component } from 'react';
import kudosContract from '../../services/KudosContractService'
import bs58 from 'bs58';

class UserPage extends Component {

  constructor(args) {
    super(args);
    this.state = {events: []};
  }

  async componentDidMount() {

    const userAddress = "0xfe996c9a9b7f29580c6b9ab92fc692065bf25f80";

    // kudosContract.events.WorkerRating({
    //   fromBlock: 0,
    //   toBlock: 'latest'
    // }, console.log);

    kudosContract.getPastEvents('WorkerRating', {
      filter: {_userAddress: userAddress},
      fromBlock: 0,
      toBlock: 'latest'
    }).then((events) => {

      this.setState({events: events});
      console.log(events);
    });
  }

  render() {

    return (

      <div>
        <h1>User Page</h1>

        {
          this.state.events.map(function(event) {

            const ipfsHash = '1220' + event.returnValues._ipfsHash.slice(2);
            console.log(ipfsHash);
            const bytes = Buffer.from(ipfsHash, 'hex');
            return <div key={event.id}>{bs58.encode(bytes)}</div>
          })
        }
      </div>
    );
  }
}

export default UserPage;