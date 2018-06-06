import React, { Component } from 'react';
import styles from './BalanceComponentStyle';
import { View, TouchableHighlight, Text, ToastAndroid } from "react-native";
import { default as localStorage } from 'react-native-sensitive-info';
import EtherBalanceRequester from "../../api/EtherBalanceRequester";
import KudosBalanceRequester from "../../api/read/KudosBalanceRequester";

class BalanceComponent extends Component {

  constructor(args) {
    super(args);
    this.state = {balance: '', etherBalance: '', kudosBalance: ''};
    this.etherBalanceRequester = new EtherBalanceRequester();
    this.kudosBalanceRequester = new KudosBalanceRequester();
  }

  async componentDidMount() {

    // const kudosAccountAddress = await localStorage.getItem('kudosAccountAddress', {
    //   keychainService: 'kudosKeychain'
    // });

    const kudosAccountAddress = '0xdcee2f1da7262362a962d456280a928f4f90bb5e';

    const etherBalance = await this.etherBalanceRequester.makeRequest(kudosAccountAddress);
    const kudosBalance = await this.kudosBalanceRequester.makeRequest(kudosAccountAddress);
    this.setState({
      balance: kudosBalance + ' KUDOS',
      etherBalance: etherBalance,
      kudosBalance: kudosBalance
    });
  }

  onClickOfBalance() {

    if (this.state.balance.includes('ETH')) {
      this.setState({balance: this.state.kudosBalance + ' KUDOS'})
    } else {
      this.setState({balance: this.state.etherBalance + ' ETH'})
    }
  }

  render() {

    return (

      <View style={styles.container}>

        <TouchableHighlight
          underlayColor='#FAFAFA'
          style={styles.balanceTextContainer}
          onPress={this.onClickOfBalance.bind(this)}>
          <View>
            <Text style={styles.balanceText}>{this.state.balance}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default BalanceComponent;
