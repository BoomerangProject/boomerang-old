import React, { Component } from 'react';
import { Text, ToastAndroid, View } from 'react-native';
import styles from './WorkerEmployersComponentStyle';

export default class WorkerEmployersComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (

      <View style={styles.container}>

        <View style={{flex: 1}}/>

        <Text>worker employers</Text>

        <View style={{flex: 1}}/>
      </View>
    );
  }
}
