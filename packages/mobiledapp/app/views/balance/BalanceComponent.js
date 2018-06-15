import React, { Component } from 'react';
import styles from './BalanceComponentStyle';
import { View, TouchableHighlight, Text, ToastAndroid } from 'react-native';
import { getItem } from '../../services/LocalStorageService';
import EtherBalanceRequester from '../../api/EtherBalanceRequester';
import KudosBalanceRequester from '../../api/read/KudosBalanceRequester';
import web3 from '../../services/Web3HttpService';

export default class BalanceComponent extends Component {

  constructor(args) {
    super(args);
    this.state = {balance: '', etherBalance: '', kudosBalance: ''};
    this.etherBalanceRequester = new EtherBalanceRequester();

  }

  async componentDidMount() {

    // const kudosAccountAddress = await getItem('kudosAccountAddress');

    const kudosAccountAddress = '0xdcee2f1da7262362a962d456280a928f4f90bb5e';
    this.kudosBalanceRequester = new KudosBalanceRequester(kudosAccountAddress);

    const etherBalance = await this.etherBalanceRequester.makeRequest(kudosAccountAddress);

    const kudosRawBalance = await this.kudosBalanceRequester.makeRequest(kudosAccountAddress);
    const kudosBalance = web3.utils.fromWei(kudosRawBalance, 'ether');

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