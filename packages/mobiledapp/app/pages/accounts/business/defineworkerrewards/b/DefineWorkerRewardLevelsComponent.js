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
    this.state = {rewardLevelDistributionFactor: 0, minReward: 100, maxReward: 1000};
  }

  onClickOfNextButton() {
    Navigator.init(this).pushDefineWorkerRewardRatingDistributionComponent();
  }

  getRewardForRewardLevel(rewardLevel) {

    const fudgeFactor = 4 / 5;
    const leftTerm = (1 - this.state.rewardLevelDistributionFactor) / this.props.numberOfRewardLevels;
    const rightTerm = this.state.rewardLevelDistributionFactor * (Math.exp(rewardLevel * fudgeFactor) - 1) / (Math.exp(this.props.numberOfRewardLevels) - 1);
    const curvePercentage = leftTerm + rightTerm;
    const rewardUnit = (this.state.maxReward - this.state.minReward) / (this.props.numberOfRewardLevels - 1);
    const value = Math.ceil(parseFloat(this.state.minReward) + parseFloat(rewardUnit * (rewardLevel-1) * this.props.numberOfRewardLevels * curvePercentage));

    // console.log('rewardLevel: ' + rewardLevel);
    // console.log('leftTerm: ' + leftTerm);
    // console.log('rightTerm: ' + rightTerm);
    // console.log('rewardUnit: ' + rewardUnit);
    // console.log('this.props.numberOfRewardLevels: ' + this.props.numberOfRewardLevels);
    // console.log('this.state.rewardLevelDistributionFactor: ' + this.state.rewardLevelDistributionFactor);
    // console.log('this.props.numberOfRewardLevels: ' + this.props.numberOfRewardLevels);
    // console.log('this.state.minReward: ' + this.state.minReward);
    // console.log('this.state.maxReward: ' + this.state.maxReward);
    // console.log('curvePercentage: ' + curvePercentage);
    // console.log('value: ' + value);

    if (value < this.state.minReward) {
      return this.state.minReward;
    }

    if (value > this.state.maxReward) {
      return this.state.maxReward;
    }

    return value;
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
           onEndEditing={(event) => {

             const value = event.nativeEvent.text.replace(/[^0-9]/g, '');

             if (i === 0) {

               if (value > this.state.maxReward) {
                 this.setState({minReward: this.state.maxReward});
               } else {
                 this.setState({minReward: value});
               }

             } else if (i === numberOfRewardLevels - 1) {

               if (value < this.state.minReward) {
                 this.setState({maxReward: this.state.minReward});
               } else {
                 this.setState({maxReward: value});
               }
             }
           }}
           keyboardType = 'numeric'
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

        <View style={{marginTop: 8, marginBottom: 8, flex: 90, flexDirection: 'row'}}>

          <View style={{width: 16}}/>

          <View style={{width: width * 1 / 3, alignItems: 'center', justifyContent: 'center'}}>
            <RewardsCircleLevelSliceComponent
              style={{
                width: width * 1 / 3,
                height: height * 0.9 - buttonContainerHeight - topMargin,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              numberOfRewardLevels={this.props.numberOfRewardLevels}
              minNumberOfRewardCycles={this.props.minNumberOfRewardCycles}
              maxNumberOfRewardCycles={this.props.maxNumberOfRewardCycles}
              numberOfRewardSteps={this.props.numberOfRewardSteps}
              levelDistributionFactor={this.props.levelDistributionFactor}
            />
          </View>

          <View style={{width: width * 1 / 3}}>
            {this.generateTextInputs()}
          </View>

          <View style={{width: width * 1 / 3, marginBottom: 16, alignItems: 'center', justifyContent: 'center'}}>

            <View style={{height: 48, alignItems: 'flex-start', justifyContent: 'center'}}>
              <Text style={styles.rewardLevelDistributionFactorLabel}>reward distribution</Text>
            </View>

            <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>

              <View style={{flex: 1}}/>

              <View style={{flex: 3, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                <Text style={{fontFamily: 'WorkSans-Regular', color: '#002A1C', fontSize: 8}}>linear</Text>
                <View style={{flex: 1}}/>
                <Text style={{fontFamily: 'WorkSans-Regular', color: '#002A1C', fontSize: 8}}>exponential</Text>
              </View>

              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Slider style={{width: 0.60 * height}}
                        orientation={'vertical'}
                        minimumValue={0}
                        maximumValue={1}
                        value={this.state.rewardLevelDistributionFactor}
                        onSlidingComplete={value => this.setState({rewardLevelDistributionFactor: value})}
                        thumbStyle={{backgroundColor: '#4D9E90', borderColor: '#4D9E90', borderWidth: 3}}
                        thumbTouchSize={{width: 60, height: 60}}
                        minimumTrackTintColor={'#4D9E90'}/>
              </View>

              <View style={{flex: 3}}/>
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
