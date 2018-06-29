import React, { Component } from 'react';
import { Text, ToastAndroid, View, Slider, TouchableOpacity } from 'react-native';
import styles from './DefineRewardsTestComponentStyle.js';
import RewardsCircleComponent from "../../../views/rewardscircle/RewardsCircleComponent";

export default class DefineRewardsTestComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {numberOfRewardLevels: 5, numberOfRewardCycles: 5, numberOfRewardSteps: 5, workerRewardStep: 0, workerRewardCycle: 1, workerRewardLevel: 1}
  }


  updateLevels({numberOfRewardLevels, workerRewardLevel} = {}) {

    if (numberOfRewardLevels != undefined) {
      this.setState({numberOfRewardLevels});

      if (this.state.workerRewardLevel > numberOfRewardLevels) {
        this.setState({workerRewardLevel: numberOfRewardLevels});
      }
    }

    if (workerRewardLevel != undefined) {
      this.setState({workerRewardLevel});
    }
  }

  updateCycles({numberOfRewardCycles, workerRewardCycle} = {}) {

    if (numberOfRewardCycles != undefined) {
      this.setState({numberOfRewardCycles});

      if (this.state.workerRewardCycle > numberOfRewardCycles) {
        this.setState({workerRewardCycle: numberOfRewardCycles});
      }
    }

    if (workerRewardCycle != undefined) {
      this.setState({workerRewardCycle});
    }
  }

  updateSteps({numberOfRewardSteps, workerRewardStep} = {}) {

    if (numberOfRewardSteps != undefined) {
      this.setState({numberOfRewardSteps});

      if (this.state.workerRewardStep > numberOfRewardSteps) {
        this.setState({workerRewardStep: numberOfRewardSteps});
      }
    }

    if (workerRewardStep != undefined) {
      this.setState({workerRewardStep});
    }
  }

  render() {

    return (

      <View style={styles.container}>

        <View style={{flex: 1}}/>

        <Text>define rewards (test)</Text>

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
            onSlidingComplete={value => this.updateLevels({ numberOfRewardLevels: value })}
            minimumValue={1}
            maximumValue={10}/>
        </View>

        <View style={{width: '80%'}}>
          <Text style={{marginLeft: 12}}>number of cycles per level: {this.state.maximumNumberOfRewardCycles}</Text>
          <Slider
            style={{width: '100%'}}
            minimumTrackTintColor='#005143'
            thumbTintColor='#005143'
            maximumTrackTintColor='#005143'
            step={1}
            value={this.state.maximumNumberOfRewardCycles}
            onSlidingComplete={value => this.updateCycles({ numberOfRewardCycles: value })}
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
            onSlidingComplete={value => this.updateSteps({ numberOfRewardSteps: value })}
            minimumValue={1}
            maximumValue={10}/>
        </View>

        <View style={{width: '80%'}}>
          <Text style={{marginLeft: 12}}>workerRewardStep: {this.state.workerRewardStep}</Text>
          <Slider
            style={{width: '100%'}}
            minimumTrackTintColor='#005143'
            thumbTintColor='#005143'
            maximumTrackTintColor='#005143'
            step={1}
            value={this.state.workerRewardStep}
            onSlidingComplete={value => this.updateSteps({ workerRewardStep: value })}
            minimumValue={0}
            maximumValue={this.state.numberOfRewardSteps}/>
        </View>

        <View style={{width: '80%'}}>
          <Text style={{marginLeft: 12}}>workerRewardCycle: {this.state.workerRewardCycle}</Text>
          <Slider
            style={{width: '100%'}}
            minimumTrackTintColor='#005143'
            thumbTintColor='#005143'
            maximumTrackTintColor='#005143'
            step={1}
            value={this.state.workerRewardCycle}
            onSlidingComplete={value => this.updateCycles({ workerRewardCycle: value })}
            minimumValue={1}
            maximumValue={this.state.maximumNumberOfRewardCycles}/>
        </View>

        <View style={{width: '80%'}}>
          <Text style={{marginLeft: 12}}>workerRewardLevel: {this.state.workerRewardLevel}</Text>
          <Slider
            style={{width: '100%'}}
            minimumTrackTintColor='#005143'
            thumbTintColor='#005143'
            maximumTrackTintColor='#005143'
            step={1}
            value={this.state.workerRewardLevel}
            onSlidingComplete={value => this.updateLevels({ workerRewardLevel: value })}
            minimumValue={1}
            maximumValue={this.state.numberOfRewardLevels}/>
        </View>

        <View style={{marginBottom: 4}}/>

        <RewardsCircleComponent
          progress={this.state.progress}
          numberOfRewardCycles={this.state.maximumNumberOfRewardCycles}
          numberOfRewardLevels={this.state.numberOfRewardLevels}
          numberOfRewardSteps={this.state.numberOfRewardSteps}
          workerRewardStep={this.state.workerRewardStep}
          workerRewardCycle={this.state.workerRewardCycle}
          workerRewardLevel={this.state.workerRewardLevel}
        />

        <View style={{flex: 1}}/>
      </View>
    );
  }
}
