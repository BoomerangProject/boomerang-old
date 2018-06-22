import React, { Component } from 'react';
import { Text, ToastAndroid, View, Slider, TouchableOpacity } from 'react-native';
import styles from './DefinePerformanceRewardsComponentStyle';
import RewardsCircleComponent from "../../../../views/rewardscircle/RewardsCircleComponent";

export default class DefinePerformanceRewardsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {numberOfRewardLevels: 10, numberOfRewardCycles: 3, numberOfRewardSteps: 2, progress: 0}
  }

  render() {

    return (

      <View style={styles.container}>

        <View style={{flex: 1}}/>

        <Text>define performance rewards</Text>

        <View style={{flex: 3}}/>

        <View style={{width: '80%'}}>
          <Text style={{marginLeft: 12}}>progress: {this.state.progress}</Text>
          <Slider
            style={{width: '100%'}}
            step={1}
            value={this.state.progress}
            onSlidingComplete={value => this.setState({ progress: value })}
            minimumValue={0}
            maximumValue={100}/>
        </View>

        <View style={{width: '80%'}}>
          <Text style={{marginLeft: 12}}>number of levels: {this.state.numberOfRewardLevels}</Text>
          <Slider
            style={{width: '100%'}}
            step={1}
            value={this.state.numberOfRewardLevels}
            onSlidingComplete={value => this.setState({ numberOfRewardLevels: value })}
            minimumValue={1}
            maximumValue={30}/>
        </View>

        <View style={{width: '80%'}}>
          <Text style={{marginLeft: 12}}>number of cycles: {this.state.numberOfRewardCycles}</Text>
          <Slider
            style={{width: '100%'}}
            step={1}
            value={this.state.numberOfRewardCycles}
            onSlidingComplete={value => this.setState({ numberOfRewardCycles: value })}
            minimumValue={1}
            maximumValue={10}/>
        </View>

        <View style={{width: '80%'}}>
          <Text style={{marginLeft: 12}}>number of steps: {this.state.numberOfRewardSteps}</Text>
          <Slider
            style={{width: '100%'}}
            step={1}
            value={this.state.numberOfRewardSteps}
            onSlidingComplete={value => this.setState({ numberOfRewardSteps: value })}
            minimumValue={2}
            maximumValue={10}/>
        </View>


        <View style={{marginBottom: 32}}/>

        <RewardsCircleComponent
          progress={this.state.progress}
          numberOfRewardCycles={this.state.numberOfRewardCycles}
          numberOfRewardLevels={this.state.numberOfRewardLevels}
          numberOfRewardSteps={this.state.numberOfRewardSteps}
        />

        <View style={{flex: 1}}/>
      </View>
    );
  }
}
