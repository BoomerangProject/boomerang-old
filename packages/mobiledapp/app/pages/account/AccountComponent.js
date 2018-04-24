import React, { Component } from 'react';
import { View, Image, Text } from "react-native";
import styles from './AccountComponentStyle';
import kudosContract from '../../services/KudosContractService'
import bs58 from 'bs58';

class AccountComponent extends Component {
  //
  // constructor(args) {
  //   super(args);
  //   this.state = {events: []};
  // }
  //
  // async componentDidMount() {
  //
  //   const userAddress = "0xfe996c9a9b7f29580c6b9ab92fc692065bf25f80";
  //
  //   // kudosContract.events.WorkerRating({
  //   //   fromBlock: 0,
  //   //   toBlock: 'latest'
  //   // }, console.log);
  //
  //   kudosContract.getPastEvents('WorkerRating', {
  //     filter: {_userAddress: userAddress},
  //     fromBlock: 0,
  //     toBlock: 'latest'
  //   }).then((events) => {
  //
  //     this.setState({events: events});
  //     console.log(events);
  //   });
  // }

  render() {

    return <View/>;
    // return (
    //
    //   <View style={styles.container}>
    //
    //     <Image style={styles.logo} source={require("../../images/kudos.png")}/>
    //     <Text>Account</Text>
    //
    //     {
    //       this.state.events.map(function(event) {
    //
    //         const ipfsHash = '1220' + event.returnValues._ipfsHash.slice(2);
    //         console.log(ipfsHash);
    //         const bytes = Buffer.from(ipfsHash, 'hex');
    //         return <Text style={styles.address} key={event.id}>{bs58.encode(bytes)}</Text>
    //       })
    //     }
    //   </View>
    // );
  }
}

export default AccountComponent;
