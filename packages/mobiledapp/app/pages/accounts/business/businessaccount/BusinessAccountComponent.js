import React, { Component } from 'react';
import { View, Button, Image, Text, ToastAndroid } from "react-native";
import styles from './BusinessAccountComponentStyle';
import KudosEventsRequester from "../../../../api/KudosEventsRequester";
import IpfsFileRequester from "../../../../api/IpfsFileRequester";
import bs58 from 'bs58';
import BalanceComponent from "../../../../views/balance/BalanceComponent";
import BusinessListComponent from "../../../../views/businessdirectory/BusinessList/BusinessListComponent";
import IsBusinessRequester from "../../../../api/read/IsBusinessRequester";

class BusinessAccountComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {businessAccountAddress: '', businessName: '', businessDescription: '', isBusiness: ''};
    this.kudosEventsRequester = new KudosEventsRequester();
    this.ipfsFileRequester = new IpfsFileRequester();
    this.isBusinessRequester = new IsBusinessRequester();
  }

  async componentDidMount() {

    // const businessAddress = await localStorage.getItem('kudosAccountAddress', {
    //   keychainService: 'kudosKeychain'
    // });

    const businessAccountAddress = '0xE86cAF4E3Df946A4ea9b3446C82F5733EA9a9aBd';

    const ipfsHash = await this.getIpfsHash(businessAccountAddress);
    console.log('ipfsHash: ' + ipfsHash);

    const businessProfile = await this.ipfsFileRequester.makeRequest(ipfsHash);
    console.log('businessProfile: ' + JSON.stringify(businessProfile));

    const isBusiness = await this.isBusinessRequester.makeRequest(businessAccountAddress);
    console.log('isBusiness: ' + isBusiness);

    this.setState({
      businessAddress: businessProfile.businessAddress,
      businessName: businessProfile.businessName,
      businessDescription: businessProfile.businessDescription,
      isBusiness: isBusiness
    });

  }

  async getIpfsHash(businessAccountAddress) {

    let events;

    try {
      events = await this.kudosEventsRequester.makeRequest('RegisteredAsBusiness', {_businessAccountAddress: businessAccountAddress});
    } catch (error) {
      console.log(error);
      return new Promise((resolve, reject) => {
        reject(error)
      });
    }

    const event = events[0];
    const ipfsHash = this.getIpfsHashFromBytes(event);
    return new Promise((resolve, reject) => {
      resolve(ipfsHash)
    });
  }

  getIpfsHashFromBytes(event) {
    const ipfsHash = '1220' + event.returnValues._ipfsHash.slice(2);
    const bytes = Buffer.from(ipfsHash, 'hex');
    return bs58.encode(bytes);
  };

  render() {

    return (

      <View style={styles.container}>

        <View style={styles.fieldContainer}>
          <Text style={styles.field}>businessAccountAddress: {this.state.businessAddress}</Text>
          <Text style={styles.field}>businessName: {this.state.businessName}</Text>
          <Text style={styles.field}>businessDescription: {this.state.businessDescription}</Text>
        </View>

        <BalanceComponent/>
        <View style={{height: 16}}/>
        <BusinessListComponent navigator={this.props.navigator}/>
      </View>
    );
  }
}

export default BusinessAccountComponent;
