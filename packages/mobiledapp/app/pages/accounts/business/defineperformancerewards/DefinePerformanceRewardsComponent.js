import React, { Component } from 'react';
import { Text, ToastAndroid, View, TouchableOpacity } from 'react-native';
import styles from './DefinePerformanceRewardsComponentStyle';
import RewardsCircleComponent from "../../../../views/rewardscircle/RewardsCircleComponent";

export default class DefinePerformanceRewardsComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (

      <View style={styles.container}>

        <View style={{flex: 1}}/>

        <Text>define performance rewards</Text>

        <RewardsCircleComponent />

        <View style={{flex: 1}}/>
      </View>
    );
  }
}
