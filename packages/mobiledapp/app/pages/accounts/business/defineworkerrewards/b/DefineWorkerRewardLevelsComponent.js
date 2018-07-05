import React, { Component } from 'react';
import { Text, TextInput, ToastAndroid, View, Image, TouchableOpacity } from 'react-native';
import styles from './DefineWorkerRewardLevelsComponentStyle';
import Navigator from '../../../../../util/Navigator';
import RewardsCircleLevelSliceComponent from '../../../../../views/rewardscirclelevelslice/RewardsCircleLevelSliceComponent';
import { Slider } from 'react-native-elements'
import { Dimensions } from 'react-native'
import { getColor } from '../../../../../util/Colors';

const uuidv4 = require('uuid/v4');

export default class DefineWorkerRewardLevelsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {rewardUpDifficulty: 0, rewardUpDifficultyDisplay: 0, minReward: 100, maxReward: 1000};
  }

  onClickOfNextButton() {
    Navigator.init(this).pushDefineWorkerRewardRatingDistributionComponent();
  }

  getRewardForRewardLevel(rewardLevel) {

    const fudgeFactor = 4/5;
    const leftTerm = (1 - this.state.rewardUpDifficulty) / this.props.numberOfRewardLevels;
    const rightTerm = this.state.rewardUpDifficulty * (Math.exp(rewardLevel*fudgeFactor) - 1) / (Math.exp(this.props.numberOfRewardLevels) - 1);
    const curvePercentage = leftTerm + rightTerm;
    const rewardUnit = this.state.maxReward / this.props.numberOfRewardLevels;
    const value = Math.ceil(rewardUnit * rewardLevel * this.props.numberOfRewardLevels * curvePercentage);

    console.log('rewardLevel: ' + rewardLevel);
    console.log('this.state.rewardUpDifficulty: ' + this.state.rewardUpDifficulty);
    console.log('this.props.numberOfRewardLevels: ' + this.props.numberOfRewardLevels);
    console.log('this.state.minReward: ' + this.state.minReward);
    console.log('this.state.maxReward: ' + this.state.maxReward);
    console.log('curvePercentage: ' + curvePercentage);
    console.log('value: ' + value);

    if (value < this.state.minReward) {
      return this.state.minReward;
    }

    if (value > this.state.maxReward) {
      return this.state.maxReward;
    }

    return value;
  }

  onChangeOfMinReward(value) {
    this.setState({minReward: value});
  }

  onChangeOfMaxReward(value) {
    this.setState({maxReward: value});
  }

  onChangeOfReward() {

  }

  generateTextInputs() {

    const numberOfRewardLevels = this.props.numberOfRewardLevels;

    let textInputs = [];

    for (let i = 0; i < numberOfRewardLevels; i++) {

      const color = getColor(i);

      let rewardValue;

      if (i === 0) {
        rewardValue = this.state.minReward;
      } else if (i === numberOfRewardLevels - 1) {
        rewardValue = this.state.maxReward;
      } else {
        rewardValue = this.getRewardForRewardLevel(i + 1);
      }

      textInputs.push(
        <View key={uuidv4()}
              style={{width: '100%', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <TextInput style={{
            width: '50%',
            height: 36,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopWidth: 1,
            color: '#002A1C',
            borderBottomWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: '#6F877F',
            backgroundColor: color
          }}
           onChange={(value) => {

             if (i === 0) {
               this.onChangeOfMinReward(value);
             } else if (i === numberOfRewardLevels - 1) {
               this.onChangeOfMaxReward(value);
             } else {
               this.onChangeOfReward(value);
             }
           }}
           selectionColor={'#89A199'}
           underlineColorAndroid={'#6F877F'}
           placeholderTextColor={'#6F877F'}
           defaultValue={rewardValue.toString()}/>

          {i === 0 && <Text style={styles.textLabel}>{` min\n boom`}</Text>}
          {i === numberOfRewardLevels - 1 && <Text style={styles.textLabel}>{` max\n boom`}</Text>}
          {i !== 0 && i !== numberOfRewardLevels - 1 && <Text style={styles.textLabel}> </Text>}
        </View>
      );
    }

    return textInputs;
  }

  render() {

    const {height, width} = Dimensions.get('window');
    const buttonContainerHeight = 58;
    const topMargin = 16;

    return (

      <View style={styles.container}>

        <View style={{marginTop: 8, marginBottom: 8, flex: 1, flexDirection: 'row'}}>

          <View style={{width: width * 1 / 3, alignItems: 'center', justifyContent: 'center'}}>
            <RewardsCircleLevelSliceComponent
              style={{
                width: width * 1 / 3,
                height: height - buttonContainerHeight - topMargin,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              numberOfRewardLevels={this.props.numberOfRewardLevels}
              minNumberOfRewardCycles={this.props.minNumberOfRewardCycles}
              maxNumberOfRewardCycles={this.props.maxNumberOfRewardCycles}
              numberOfRewardSteps={this.props.numberOfRewardSteps}
              levelUpDifficultyFactor={this.props.levelUpDifficultyFactor}
            />
          </View>

          <View style={{width: width * 1 / 3}}>
            {this.generateTextInputs()}
          </View>



          <View style={{width: width * 1 / 3, alignItems: 'center', justifyContent: 'center'}}>

            <View style={{height: 48, alignItems: 'flex-end', justifyContent: 'flex-end'}}>

            <Text style={styles.rewardUpDifficultyLabel}>reward up{'\n'}difficulty: {(this.state.rewardUpDifficultyDisplay * 100).toFixed(2) + '%'}</Text>
            </View>

            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Slider style={{width: 0.64 * height}}
                      orientation={'vertical'}
                      minimumValue={0}
                      maximumValue={1}
                      value={this.state.rewardUpDifficulty}
                      onValueChange={value => this.setState({rewardUpDifficultyDisplay: value})}
                      onSlidingComplete={value => this.setState({rewardUpDifficulty: value})}
                      thumbStyle={{backgroundColor: '#005143', borderColor: '#005143', borderWidth: 3}}
                      thumbTouchSize={{width: 60, height: 60}}
                      minimumTrackTintColor={'#005143'}/>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onClickOfNextButton.bind(this)}>
          <Text style={styles.button}>next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
