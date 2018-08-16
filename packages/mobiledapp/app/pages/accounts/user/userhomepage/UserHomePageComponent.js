import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './UserHomePageComponentStyle';
import { getItem, setItem } from "../../../../services/LocalStorageService";
import IpfsFileRequester from '../../../../api/IpfsFileRequester';
import GetNonceValueRequester from '../../../../api/read/GetNonceValueRequester';
import RateBoomerangExperienceRequester from '../../../../api/write/RateBoomerangExperienceRequester';
import GetNonceValueForNewRatingRequester from '../../../../api/read/GetNonceValueForNewRatingRequester';


const userAddress = '0x74AF84d40c47Bc7d2fe9294562EcA54eAF4Fa0eA';
const workerAddress = '0x83b21d39574d21ea31b05ecc027ca38633f9354f';
const businessAddress = '0x8AF0Ba103658814b394e5a61FCeD7033934a97cA';
const ipfsHash = 'QmNQZ9S4WkF4UjnYQPtpmb438UTp9g4jGx6TAHpSg2fXBc';
const v = 28;
const r = '0xed209a7d522c6b7a4dad1a44e5e3bd825dddef1e1583d0cc47d50f331b825117';
const s = '0x49c4dfbf96a74ee2d2f170ba32557e7622534d58770a52d6e1c1182462d1b48b';

export default class UserHomePageComponent extends Component {

  constructor(args) {
    super(args);
    this.state = {userAddress: '', userName: '', nonceValue: ''};
    this.getNonceValueForNewRatingRequester = new GetNonceValueForNewRatingRequester(businessAddress, workerAddress);
    this.rateBoomerangExperienceRequeser = new RateBoomerangExperienceRequester(userAddress, workerAddress, businessAddress, '5', '5', ipfsHash, v, r, s);
  }

  async componentDidMount() {
    await setItem('isLoggedIn', 'true');

    const userAddress = await getItem('boomerangAccountAddress');
    this.ipfsFileRequester = new IpfsFileRequester('UserProfileUpdated', {_userAddress: userAddress});

    const file = await this.ipfsFileRequester.makeRequest();
    console.log('this is the file: \n\n');
    console.log(JSON.stringify(file));
    this.setState({userAddress: file.userAddress, userName: file.userName});

    let nonceValue = await this.getNonceValueForNewRatingRequester.makeRequest();
    console.log('nonceValue: ' + nonceValue);
    this.setState({nonceValue: nonceValue});
  }

  async onClickOfRateExperienceButton() {

    let txReceipt = await this.rateBoomerangExperienceRequeser.makeRequest();
    console.log(txReceipt);
  }

  async componentWillUnmount() {
    await this.getNonceValueForNewRatingRequester.cancel();
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
