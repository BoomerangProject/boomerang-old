import React, { Component } from 'react';
import { Text, ToastAndroid, View } from 'react-native';
import styles from './UserLoyaltyRewardsComponentStyle';

export default class UserLoyaltyRewardsComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (

      <View style={styles.container}>

        <View style={{flex: 1}}/>

        <Text>loyalty rewards</Text>

        <View style={{flex: 1}}/>
      </View>
    );
  }
}
