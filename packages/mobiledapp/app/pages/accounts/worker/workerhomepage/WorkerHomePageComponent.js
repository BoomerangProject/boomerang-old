import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './WorkerHomePageComponentStyle';
import { getItem, setItem } from "../../../../services/LocalStorageService";
import IpfsFileRequester from '../../../../api/IpfsFileRequester';

export default class WorkerAccountComponent extends Component {

  constructor(args) {
    super(args);
    this.state = {workerAddress: '', workerName: ''};
  }

  async componentDidMount() {
    await setItem('isLoggedIn', 'true');

    const workerAddress = await getItem('kudosAccountAddress');
    this.ipfsFileRequester = new IpfsFileRequester('WorkerProfileUpdated', {_workerAddress: workerAddress});

    const file = await this.ipfsFileRequester.makeRequest();
    this.setState({workerAddress: file.workerAddress, workerName: file.workerName});
  }

  render() {

    return (

      <View style={styles.container}>

        <View style={{flex:1}}/>

        <View style={styles.profileContainer}>
          <Text style={styles.profileText}>workerAddress: {this.state.workerAddress}</Text>
          <Text style={styles.profileText}>workerName: {this.state.workerName}</Text>
        </View>

        <View style={{flex:5}}/>
      </View>
    );
  }
}
