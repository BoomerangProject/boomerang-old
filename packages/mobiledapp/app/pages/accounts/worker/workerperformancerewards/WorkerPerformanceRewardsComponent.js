import React, { Component } from 'react';
import { Text, ToastAndroid, View } from 'react-native';
import styles from './WorkerPerformanceRewardsComponentStyle';

export default class WorkerPerformanceRewardsComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (

      <View style={styles.container}>

        <View style={{flex: 1}}/>

        <Text>performance rewards</Text>

        <View style={{flex: 1}}/>
      </View>
    );
  }
}
