import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './UserAccountComponentStyle';
import { getItem, setItem } from "../../../services/LocalStorageService";
import IpfsFileRequester from '../../../api/IpfsFileRequester';

export default class UserAccountComponent extends Component {

  constructor(args) {
    super(args);
    this.state = {userAddress: '', userName: ''};
  }

  async componentDidMount() {
    await setItem('isLoggedIn', 'true');

    const userAddress = await getItem('kudosAccountAddress');
    this.ipfsFileRequester = new IpfsFileRequester('UserProfileUpdated', {_userAddress: userAddress});

    const file = await this.ipfsFileRequester.makeRequest();
    console.log('this is the file: \n\n');
    console.log(JSON.stringify(file));
    this.setState({userAddress: file.userAddress, userName: file.userName});
  }

  render() {

    return (

      <View style={styles.container}>

        <View style={{flex:1}}/>

        <View style={styles.profileContainer}>
          <Text style={styles.profileText}>userAddress: {this.state.userAddress}</Text>
          <Text style={styles.profileText}>userName: {this.state.userName}</Text>
        </View>

        <View style={{flex:5}}/>
      </View>
    );
  }
}
