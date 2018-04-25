import React, { Component } from 'react';
import { View, Image, Text, FlatList, ToastAndroid, TouchableHighlight } from "react-native";
import styles from './AccountComponentStyle';
import kudosContract from '../../services/KudosContractService'
import bs58 from 'bs58';

class AccountComponent extends Component {

  constructor(args) {
    super(args);
    this.state = {reviews: []};
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

      events.map((event) => {

        let review = {};
        review.ipfsHash = this.getIpfsHash(event);
        review.key = event.id;

        this.setState(prevState => ({
          reviews: [...prevState.reviews, review]
        }));
      });
    });
  }

  getIpfsHash(event) {
    const ipfsHash = '1220' + event.returnValues._ipfsHash.slice(2);
    const bytes = Buffer.from(ipfsHash, 'hex');
    return bs58.encode(bytes);
  };

  onClickOfReview(review) {
    ToastAndroid.show("here", ToastAndroid.SHORT)
  };

  render() {

    return (

      <View style={styles.container}>

        <Image style={styles.logo} source={require("../../images/kudos.png")}/>
        <Text>Account</Text>

        <FlatList
          data={this.state.reviews}
          renderItem={({item}) =>

            <View>
              <TouchableHighlight
                onPress={this.onClickOfReview(item)}>
                <Text style={styles.address} key={item.key}>{item.ipfsHash}</Text>
              </TouchableHighlight>
            </View>
          }
        />
      </View>
    );
  }
}

export default AccountComponent;
