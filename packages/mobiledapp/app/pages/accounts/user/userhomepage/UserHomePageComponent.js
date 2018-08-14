import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './UserHomePageComponentStyle';
import { getItem, setItem } from "../../../../services/LocalStorageService";
import IpfsFileRequester from '../../../../api/IpfsFileRequester';
import GetNonceValueRequester from '../../../../api/read/GetNonceValueRequester';
import RateBoomerangExperienceRequester from '../../../../api/write/RateBoomerangExperienceRequester';


const businessAddress = '0x8715db79576978f5118aa96bc3ed5d70fca68448';
const workerAddress = '0x83b21d39574d21ea31b05ecc027ca38633f9354f';
const userAddress = '0x71248354c8C2951d0026972CF44213E737D6E3d8';
const ipfsHash = 'QmNQZ9S4WkF4UjnYQPtpmb438UTp9g4jGx6TAHpSg2fXBc';

export default class UserAccountComponent extends Component {

  constructor(args) {
    super(args);
    this.state = {userAddress: '', userName: '', nonceValue: ''};
    this.getNonceValueRequester = new GetNonceValueRequester(businessAddress, workerAddress);
    this.rateBoomerangExperienceRequeser = new RateBoomerangExperienceRequester(userAddress, workerAddress, businessAddress, '5', '5', ipfsHash);
  }

  async componentDidMount() {
    await setItem('isLoggedIn', 'true');

    const userAddress = await getItem('boomerangAccountAddress');
    this.ipfsFileRequester = new IpfsFileRequester('UserProfileUpdated', {_userAddress: userAddress});

    const file = await this.ipfsFileRequester.makeRequest();
    console.log('this is the file: \n\n');
    console.log(JSON.stringify(file));
    this.setState({userAddress: file.userAddress, userName: file.userName});


    let nonceValue = await this.getNonceValueRequester.makeRequest();
    console.log('nonceValue: ' + nonceValue);
    this.setState({nonceValue: nonceValue});
  }

  async onClickOfRateExperienceButton() {

    let txReceipt = await this.rateBoomerangExperienceRequeser.makeRequest();
    console.log(txReceipt);
  }

  async componentWillUnmount() {
    await this.getNonceValueRequester.cancel();
    await this.rateBoomerangExperienceRequeser.cancel();
  }

  render() {

    return (

      <View style={styles.container}>

        <View style={{flex:1}}/>

        <View style={styles.profileContainer}>
          <Text style={styles.profileText}>userAddress: {this.state.userAddress}</Text>
          <Text style={styles.profileText}>userName: {this.state.userName}</Text>
          <Text style={styles.profileText}>---</Text>
          <Text style={styles.profileText}>nonceValue: {this.state.nonceValue}</Text>
        </View>

        <View style={{flex:4}}/>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onClickOfRateExperienceButton.bind(this)}>
          <Text style={styles.button}>rate experience</Text>
        </TouchableOpacity>

        <View style={{flex:1}}/>
      </View>
    );
  }
}
