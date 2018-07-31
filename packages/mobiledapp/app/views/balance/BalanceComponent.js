import React, { Component } from 'react';
import styles from './BalanceComponentStyle';
import { View, TouchableHighlight, Text, ToastAndroid } from 'react-native';
import { getItem } from '../../services/LocalStorageService';
import EtherBalanceRequester from '../../api/EtherBalanceRequester';
import BoomerangBalanceRequester from '../../api/read/BoomerangBalanceRequester';
import web3 from '../../services/Web3HttpService';

export default class BalanceComponent extends Component {

  constructor(args) {
    super(args);
    this.state = {balance: '', etherBalance: '', boomerangBalance: ''};
    this.etherBalanceRequester = new EtherBalanceRequester();

  }

  async componentDidMount() {

    // const boomerangAccountAddress = await getItem('boomerangAccountAddress');

    const boomerangAccountAddress = '0xdcee2f1da7262362a962d456280a928f4f90bb5e';
    this.boomerangBalanceRequester = new BoomerangBalanceRequester(boomerangAccountAddress);

    const etherBalance = await this.etherBalanceRequester.makeRequest(boomerangAccountAddress);

    const boomerangRawBalance = await this.boomerangBalanceRequester.makeRequest(boomerangAccountAddress);
    const boomerangBalance = web3.utils.fromWei(boomerangRawBalance, 'ether');

    this.setState({
      balance: boomerangBalance + ' BOOM',
      etherBalance: etherBalance,
      boomerangBalance: boomerangBalance
    });
  }

  onClickOfBalance() {

    if (this.state.balance.includes('ETH')) {
      this.setState({balance: this.state.boomerangBalance + ' BOOM'})
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