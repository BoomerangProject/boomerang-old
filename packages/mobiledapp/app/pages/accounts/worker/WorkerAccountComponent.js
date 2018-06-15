import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './WorkerAccountComponentStyle';
import { getItem, setItem } from "../../../services/LocalStorageService";

export default class WorkerAccountComponent extends Component {

  async componentDidMount() {
    await setItem('isLoggedIn', 'true');
    await setItem('isWorker', 'true');
  }

  render() {

    return (

      <View style={styles.container}>
        <Text>Worker Account</Text>
      </View>
    );
  }
}
