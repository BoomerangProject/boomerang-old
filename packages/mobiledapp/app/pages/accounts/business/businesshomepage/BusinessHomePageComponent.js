import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './BusinessHomePageComponentStyle';
import { getItem, setItem } from "../../../../services/LocalStorageService";
import IpfsFileRequester from '../../../../api/IpfsFileRequester';

export default class BusinessAccountComponent extends Component {

  constructor(args) {
    super(args);
    this.state = {businessAddress: '', businessName: '', businessDescription: ''};
  }

  async componentDidMount() {
    await setItem('isLoggedIn', 'true');

    const businessAddress = await getItem('boomerangAccountAddress');
    this.ipfsFileRequester = new IpfsFileRequester('BusinessProfileUpdated', {_businessAddress: businessAddress});

    const file = await this.ipfsFileRequester.makeRequest();
    this.setState({businessAddress: file.businessAddress, businessName: file.businessName, businessDescription: file.businessDescription});
  }

  render() {

    return (

      <View style={styles.container}>

        <View style={{flex:1}}/>

        <View style={styles.profileContainer}>
          <Text style={styles.profileText}>businessAddress: {this.state.businessAddress}</Text>
          <Text style={styles.profileText}>businessName: {this.state.businessName}</Text>
          <Text style={styles.profileText}>businessDescription: {this.state.businessDescription}</Text>
        </View>

        <View style={{flex:5}}/>
      </View>
    );
  }
}
