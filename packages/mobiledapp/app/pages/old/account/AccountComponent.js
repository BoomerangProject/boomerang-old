import React, { Component } from 'react';
import { View, Image, Text, FlatList, ToastAndroid, TouchableOpacity } from 'react-native';
import styles from './AccountComponentStyle';
import boomerangContract from '../../../services/BoomerangContractServiceOld'
import bs58 from 'bs58';
import { getItem } from '../../../services/LocalStorageService';

export default class AccountComponent extends Component {

  constructor(args) {
    super(args);
    this.state = {reviewEvents: [], boomerangAccountSeed: '', boomerangAccountAddress: ''};
    // this.state = {reviewEvents: []};
  }

  async componentDidMount() {

    const userAddress = '0xfe996c9a9b7f29580c6b9ab92fc692065bf25f80';

    // boomerangContract.events.WorkerRating({
    //   fromBlock: 0,
    //   toBlock: 'latest'
    // }, console.log);

    boomerangContract.getPastEvents('WorkerRating', {
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

    const boomerangAccountSeed = await getItem('boomerangAccountSeed');
    this.setState({boomerangAccountSeed});

    const boomerangAccountAddress = await getItem('boomerangAccountAddress');
    this.setState({boomerangAccountAddress});
  }

  getIpfsHashFromBytes(event) {
    const ipfsHash = '1220' + event.returnValues._ipfsHash.slice(2);
    const bytes = Buffer.from(ipfsHash, 'hex');
    return bs58.encode(bytes);
  };

  onClickOfReviewTile(reviewEvent) {

    this.props.navigator.push({
      screen: 'ReviewPage',
      passProps: {
        reviewEvent
      }
    });
  };

  render() {

    return (

      <View style={styles.container}>

        <Image style={styles.logo} source={require('../../../../assets/images/boomerang.png')}/>
        <Text>Account</Text>
        <Text>{'private key: ' + this.state.boomerangAccountSeed}</Text>
        <Text>{'account address: ' + this.state.boomerangAccountAddress}</Text>

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