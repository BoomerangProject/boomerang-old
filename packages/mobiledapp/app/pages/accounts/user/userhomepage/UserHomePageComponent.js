import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './UserHomePageComponentStyle';
import { getItem, setItem } from "../../../../services/LocalStorageService";
import IpfsFileRequester from '../../../../api/IpfsFileRequester';
import GetNonceValueRequester from '../../../../api/read/GetNonceValueRequester';
import RateBoomerangExperienceRequester from '../../../../api/write/RateBoomerangExperienceRequester';


const businessAddress = '0x8715db79576978f5118aa96bc3ed5d70fca68448';
const workerAddress = '0x83b21d39574d21ea31b05ecc027ca38633f9354f';
const userAddress = '0xda47c60f629876812674a9d95b3acd306ee21aac';
const ipfsHash = '0x7aec552a65bfd833319cecd80cb10be136a35c9da94a8c899f2536c371293b93';

export default class UserAccountComponent extends Component {

  constructor(args) {
    super(args);
    this.state = {userAddress: '', userName: '', nonceValue: ''};
    this.getNonceValueRequester = new GetNonceValueRequester();
    this.rateBoomerangExperienceRequeser = new RateBoomerangExperienceRequester();
  }

  async componentDidMount() {
    await setItem('isLoggedIn', 'true');

    const userAddress = await getItem('boomerangAccountAddress');
    this.ipfsFileRequester = new IpfsFileRequester('UserProfileUpdated', {_userAddress: userAddress});

    const file = await this.ipfsFileRequester.makeRequest();
    console.log('this is the file: \n\n');
    console.log(JSON.stringify(file));
    this.setState({userAddress: file.userAddress, userName: file.userName});


    let nonceValue = await this.getNonceValueRequester.makeRequest(businessAddress, workerAddress);
    console.log('nonceValue: ' + nonceValue);
    this.setState({nonceValue: nonceValue});
  }

  async onClickOfRateExperienceButton() {

    let txReceipt = await this.rateBoomerangExperienceRequeser.makeRequest(userAddress,workerAddress, businessAddress, 5, 5, ipfsHash);
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
