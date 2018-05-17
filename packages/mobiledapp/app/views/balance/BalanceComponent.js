import React, { Component } from 'react';
import styles from './BalanceComponentStyle';
import { View, TouchableHighlight, Text, ToastAndroid } from "react-native";
import { default as localStorage } from 'react-native-sensitive-info';
import IsBusinessRequester from "../../api/IsBusinessRequester";
import GetBalanceRequester from "../../api/EtherBalanceRequester";

class BalanceComponent extends Component {

  constructor(args) {
    super(args);
    this.state = {balance: ''};
    this.getBalanceRequester = new GetBalanceRequester();
    this.isBusinessRequester = new IsBusinessRequester();
  }

  async componentDidMount() {

    const kudosAccountAddress = await localStorage.getItem('kudosAccountAddress', {
      keychainService: 'kudosKeychain'
    });

    const balance = await this.isBusinessRequester.makeRequest(kudosAccountAddress);
    this.setState({balance});
  }

  onClickOfBalance() {
    ToastAndroid.show('balance', ToastAndroid.SHORT);
  }

  render() {

    return (

      <View style={styles.container}>

        <TouchableHighlight
          underlayColor='#FAFAFA'
          style={styles.balanceTextContainer}
          onPress={this.onClickOfBalance.bind(this)}>
          <Text style={styles.balanceText}>{this.state.balance.toString()}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default BalanceComponent;
