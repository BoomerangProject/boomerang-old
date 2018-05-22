import React, { Component } from 'react';
import { View, Image, Text, FlatList, ToastAndroid, TouchableOpacity } from "react-native";
import styles from './AccountComponentStyle';
import kudosContract from '../../../services/KudosContractServiceOld'
import bs58 from 'bs58';
import { default as localStorage } from 'react-native-sensitive-info';

class AccountComponent extends Component {

  constructor(args) {
    super(args);
    this.state = {reviewEvents: [], kudosAccountSeed: '', kudosAccountAddress: ''};
    // this.state = {reviewEvents: []};
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
      }, function(error, events) {

        if (error) {
          ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
          console.log(error.toString());
        }
      }
    ).then((events) => {

      events.map((event) => {

        let reviewEvent = {};
        reviewEvent.ipfsHash = this.getIpfsHashFromBytes(event);
        reviewEvent.key = event.id;

        this.setState(prevState => ({
          reviewEvents: [...prevState.reviewEvents, reviewEvent]
        }));
      });
    });

    const kudosAccountSeed = await localStorage.getItem('kudosAccountSeed', {
      keychainService: 'kudosKeychain'
      });
    this.setState({kudosAccountSeed});

    const kudosAccountAddress = await localStorage.getItem('kudosAccountAddress', {
      keychainService: 'kudosKeychain'
    });
    this.setState({kudosAccountAddress});
  }

  getIpfsHashFromBytes(event) {
    const ipfsHash = '1220' + event.returnValues._ipfsHash.slice(2);
    const bytes = Buffer.from(ipfsHash, 'hex');
    return bs58.encode(bytes);
  };

  onClickOfReviewTile(reviewEvent) {

    this.props.navigator.push({
      screen: 'ReviewComponent',
      passProps: {
        reviewEvent
      }
    });
  };

  render() {

    return (

      <View style={styles.container}>

        <Image style={styles.logo} source={require("../../../../assets/images/kudos.png")}/>
        <Text>Account</Text>
        <Text>{'private key: ' + this.state.kudosAccountSeed}</Text>
        <Text>{'account address: ' + this.state.kudosAccountAddress}</Text>

        <FlatList
          data={this.state.reviewEvents}
          renderItem={({item: reviewEvent}) =>

            <View>
              <TouchableOpacity
                onPress={() => this.onClickOfReviewTile(reviewEvent)}>
                <Text style={styles.address} key={reviewEvent.key}>{reviewEvent.ipfsHash}</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    );
  }
}

export default AccountComponent;
