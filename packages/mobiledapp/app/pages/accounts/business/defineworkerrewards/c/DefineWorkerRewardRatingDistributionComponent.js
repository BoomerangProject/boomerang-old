import React, { Component } from 'react';
import { Text, ToastAndroid, View, Slider, Image, TouchableOpacity } from 'react-native';
import styles from './DefineWorkerRewardRatingDistributionComponentStyle';
import Navigator from '../../../../../util/Navigator';
import RewardsCircleComponent from '../../../../../views/rewardscircle/RewardsCircleComponent';

export default class DefineWorkerRewardRatingDistributionComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  onClickOfNextButton() {
    Navigator.init(this).pushDefineWorkerRewardRatingColorSchemeComponent();
  }

  render() {

    return (

      <View style={styles.container}>

        <View style={{flex:1}}/>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onClickOfNextButton.bind(this)}>
          <Text style={styles.button}>next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
