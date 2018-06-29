import React, { Component } from 'react';
import { Text, ToastAndroid, View, Slider, Image, TouchableOpacity } from 'react-native';
import styles from './DefineWorkerRewardLevelsComponentStyle';
import Navigator from '../../../../../util/Navigator';
import RewardsCircleComponent from '../../../../../views/rewardscircle/RewardsCircleComponent';
import RewardsCircleLevelSliceComponent from '../../../../../views/rewardscirclelevelslice/RewardsCircleLevelSliceComponent';

export default class DefineWorkerRewardLevelsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  onClickOfNextButton() {
    Navigator.init(this).pushDefineWorkerRewardRatingDistributionComponent();
  }

  render() {

    return (

      <View style={styles.container}>

        <View style={{marginTop: 16}}/>

        <View style={{width: '100%', flexDirection: 'row', alignContent: 'flex-start'}}>

          <RewardsCircleLevelSliceComponent
            style={{width: '50%'}}
            numberOfRewardLevels={this.props.numberOfRewardLevels}
            minNumberOfRewardCycles={this.props.minNumberOfRewardCycles}
            maxNumberOfRewardCycles={this.props.maxNumberOfRewardCycles}
            numberOfRewardSteps={this.props.numberOfRewardSteps}
            levelUpDifficultyFactor={this.props.levelUpDifficultyFactor}
          />

          <Text style={{width: '50%'}}>kudos amounts here</Text>
        </View>

        <Text>little comment</Text>

        <View style={{flex: 1}}/>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onClickOfNextButton.bind(this)}>
          <Text style={styles.button}>next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
