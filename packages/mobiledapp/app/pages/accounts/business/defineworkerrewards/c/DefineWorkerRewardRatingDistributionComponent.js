import React, { Component } from 'react';
import { Text, ToastAndroid, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import styles from './DefineWorkerRewardRatingDistributionComponentStyle';
import Navigator from '../../../../../util/Navigator';
import RewardsCircleComponent from '../../../../../views/rewardscircle/RewardsCircleComponent';
import RewardRatingDistributionStarGraphComponent from '../../../../../views/rewardratingdistributionstargraph/RewardRatingDistributionStarGraphComponent';

export default class DefineWorkerRewardRatingDistributionComponent extends Component {

  constructor(props) {
    super(props);
  }

  onClickOfNextButton() {
    Navigator.init(this).pushDefineWorkerRewardRatingColorSchemeComponent();
  }

  render() {

    const {height, width} = Dimensions.get('window');

    return (

      <View style={styles.container}>

        <View style={{flex:1}}/>

        <RewardRatingDistributionStarGraphComponent
          style={{
          width: width*0.75,
          alignItems: 'center',
          justifyContent: 'center'}}/>

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
