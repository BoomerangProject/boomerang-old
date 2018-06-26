import React, { Component } from 'react';
import { Text, ToastAndroid, View, Slider, TouchableOpacity } from 'react-native';
import styles from './DefineWorkerRewardsComponentStyle';
import RewardsCircleComponent from "../../../../views/rewardscircle/RewardsCircleComponent";

export default class DefineWorkerRewardsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {numberOfRewardLevels: 5, numberOfRewardCycles: 5, numberOfRewardSteps: 5, levelUpCurveFactor: 0}
  }

  render() {

    return (

      <View style={styles.container}>

        <View style={{flex: 1}}/>

        <View style={{width: '80%'}}>
          <Text style={{marginLeft: 12}}>number of levels: {this.state.numberOfRewardLevels}</Text>
          <Slider
            style={{width: '100%'}}
            step={1}
            minimumTrackTintColor='#005143'
            thumbTintColor='#005143'
            maximumTrackTintColor='#005143'
            value={this.state.numberOfRewardLevels}
            onSlidingComplete={value => this.setState({ numberOfRewardLevels: value })}
            minimumValue={1}
            maximumValue={10}/>
        </View>

        <View style={{width: '80%'}}>
          <Text style={{marginLeft: 12}}>number of cycles per level: {this.state.numberOfRewardCycles}</Text>
          <Slider
            style={{width: '100%'}}
            minimumTrackTintColor='#005143'
            thumbTintColor='#005143'
            maximumTrackTintColor='#005143'
            step={1}
            value={this.state.numberOfRewardCycles}
            onSlidingComplete={value => this.setState({ numberOfRewardCycles: value })}
            minimumValue={1}
            maximumValue={10}/>
        </View>

        <View style={{width: '80%'}}>
          <Text style={{marginLeft: 12}}>number of steps per cycle: {this.state.numberOfRewardSteps}</Text>
          <Slider
            style={{width: '100%'}}
            minimumTrackTintColor='#005143'
            thumbTintColor='#005143'
            maximumTrackTintColor='#005143'
            step={1}
            value={this.state.numberOfRewardSteps}
            onSlidingComplete={value => this.setState({ numberOfRewardSteps: value })}
            minimumValue={1}
            maximumValue={10}/>
        </View>

        <View style={{width: '60%'}}>
          <Text style={{marginLeft: 12}}>level up curve: {this.state.levelUpCurveFactor}</Text>
          <Slider
            style={{width: '100%'}}
            minimumTrackTintColor='#005143'
            thumbTintColor='#005143'
            maximumTrackTintColor='#005143'
            step={1}
            value={this.state.levelUpCurveFactor}
            onSlidingComplete={value => this.setState({ levelUpCurveFactor: value })}
            minimumValue={0}
            maximumValue={10}/>
        </View>


        <View style={{marginBottom: 8}}/>

        <RewardsCircleComponent
          progress={this.state.progress}
          numberOfRewardSteps={this.state.numberOfRewardSteps}
          numberOfRewardCycles={this.state.numberOfRewardCycles}
          numberOfRewardLevels={this.state.numberOfRewardLevels}
          workerRewardStep={this.state.numberOfRewardSteps}
          workerRewardCycle={this.state.numberOfRewardCycles}
          workerRewardLevel={this.state.numberOfRewardLevels}
          levelUpCurveFactor={this.state.levelUpCurveFactor}
        />

        <View style={{flex: 1}}/>
      </View>
    );
  }
}
