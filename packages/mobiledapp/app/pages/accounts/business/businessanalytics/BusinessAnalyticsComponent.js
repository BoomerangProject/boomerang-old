import React, { Component } from 'react';
import { Text, ToastAndroid, View } from 'react-native';
import styles from './BusinessAnalyticsComponentStyle';

export default class BusinessAnalyticsComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (

      <View style={styles.container}>

        <View style={{flex: 1}}/>

        <Text>business analytics</Text>

        <View style={{flex: 1}}/>
      </View>
    );
  }
}
