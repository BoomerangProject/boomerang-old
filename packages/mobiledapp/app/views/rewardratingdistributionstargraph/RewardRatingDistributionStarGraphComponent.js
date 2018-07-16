import React, { Component } from 'react';
import styles from './RewardRatingDistributionStarGraphComponentStyle';
import Svg, { Rect, Path } from 'react-native-svg';
import { Text, Slider, TextInput, ToastAndroid, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const uuidv4 = require('uuid/v4');

export default class RewardRatingDistributionStarGraphComponent extends Component {

  constructor(args) {
    super(args);

    this.state = {
      ratingRewardPercentages: [0,25,50,75,100],
      ratingRewardDistributionFactor: 0
    };
  }

  getRewardForRating(ratingIndex) {

    const minReward = this.state.ratingRewardPercentages[0];
    const maxReward = this.state.ratingRewardPercentages[4];

    if (ratingIndex === 0) {
      return minReward;
    }

    if (ratingIndex === 4) {
      return maxReward;
    }

    const numberOfPossibleRatings = 5;

    const fudgeFactor = 4 / 5;
    const leftTerm = (1 - this.state.ratingRewardDistributionFactor) / numberOfPossibleRatings;
    const rightTerm = this.state.ratingRewardDistributionFactor * (Math.exp((ratingIndex+1) * fudgeFactor) - 1) / (Math.exp(numberOfPossibleRatings) - 1);
    const curvePercentage = leftTerm + rightTerm;
    const rewardUnit = (maxReward - minReward) / (numberOfPossibleRatings - 1);
    const value = Math.ceil(parseFloat(minReward) + parseFloat(rewardUnit * ratingIndex * numberOfPossibleRatings * curvePercentage));

    // console.log('ratingIndex: ' + ratingIndex);
    // console.log('leftTerm: ' + leftTerm);
    // console.log('rightTerm: ' + rightTerm);
    // console.log('rewardUnit: ' + rewardUnit);
    // console.log('this.state.ratingRewardDistributionFactor: ' + this.state.ratingRewardDistributionFactor);
    // console.log('minReward: ' + minReward);
    // console.log('maxReward: ' + maxReward);
    // console.log('curvePercentage: ' + curvePercentage);
    // console.log('value: ' + value);

    if (value < minReward) {
      return minReward;
    }

    if (value > maxReward) {
      return maxReward;
    }

    return value;
  }

  updateRatingRewardPercentage(index, value) {
    const ratingRewardPercentages = this.state.ratingRewardPercentages;
    ratingRewardPercentages[index] = value;
    this.setState({ratingRewardPercentages: ratingRewardPercentages});
  }
  
  render() {

    const height = 100;
    const width = this.props.style.width;
    const textInputHeight = 36;

    let rectangles = [];
    let textInputs = [];

    for (let i = 0; i < 5; i++) {
      rectangles.push(
        <Rect
          key={uuidv4()}
          x={width / 5 * i}
          y={height - this.getRewardForRating(i)}
          width={width / 5}
          height={this.getRewardForRating(i)}
          fill="#80b1d3"
          strokeWidth="0.1"
          stroke='black'
        />);

      textInputs.push(
        <TextInput
          key={uuidv4()}
          style={{
            width: 36,
            height: textInputHeight,
            marginTop: height - this.getRewardForRating(i) - textInputHeight,
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 10,
            fontFamily: 'WorkSans-Regular',
            color: 'black',
            textAlign: 'center',
            borderColor: '#6F877F',
            backgroundColor: 'white'
          }}
         defaultValue={this.getRewardForRating(i).toString() + '%'}
         maxLength={4}
         selectionColor='#6F877F'
         placeholderTextColor='#6F877F'
         underlineColorAndroid='#6F877F'
         onEndEditing={(event) => {

           const value = parseFloat(event.nativeEvent.text.replace(/[^0-9]/g, ''));
           const minReward = this.state.ratingRewardPercentages[0];
           const maxReward = this.state.ratingRewardPercentages[4];

           if (i === 0 && value > maxReward) {
             this.updateRatingRewardPercentage(i, maxReward);
           } else if (i === 4 && value < minReward) {
             this.updateRatingRewardPercentage(i, minReward);
           } else {
             this.updateRatingRewardPercentage(i, value);
           }
         }}/>
      );
    }

    return (

      <View style={styles.container}>

        <View style={{borderColor: '#002A1C', alignItems: 'center', borderWidth: 1, height: 200, width: width+32}}>

          <View style={{marginTop: 50}}>

            <Svg style={this.props.style} width={width} height={height}>
              {rectangles}
            </Svg>

            <View style={{
              position: 'absolute',
              flexDirection: 'row',
              width: this.props.style.width,
              justifyContent: 'space-around'
            }}>
              {textInputs}
            </View>
          </View>

          <View
            style={{marginTop: 4, position: 'relative', flexDirection: 'row', width: this.props.style.width, justifyContent: 'space-around'}}>
            <Icon name="star" size={30} color="#ffed89"/>
            <Icon name="star" size={30} color="#ffed89"/>
            <Icon name="star" size={30} color="#ffed89"/>
            <Icon name="star" size={30} color="#ffed89"/>
            <Icon name="star" size={30} color="#ffed89"/>
          </View>
        </View>

        <Text style={{marginTop: 16, fontSize: 12, color: '#002A1C', fontFamily: 'WorkSans-Regular', marginLeft: 12}}>reward distribution</Text>

        <View style={{flexDirection: 'row', width: '90%'}}>
          <Slider
            style={{width: '100%'}}
            minimumTrackTintColor='#005143'
            thumbTintColor='#005143'
            maximumTrackTintColor='#005143'
            value={this.state.ratingRewardDistributionFactor}
            onSlidingComplete={value => this.setState({ratingRewardDistributionFactor: value})}
            minimumValue={0}
            maximumValue={1}/>
        </View>

        <View style={{flexDirection: 'row', width: '85%', marginTop: -2}}>
          <Text style={{fontFamily: 'WorkSans-Regular', color: '#002A1C', fontSize: 8}}>linear</Text>
          <View style={{flex: 1}}/>
          <Text style={{fontFamily: 'WorkSans-Regular', color: '#002A1C', fontSize: 8}}>exponential</Text>
        </View>
      </View>
    );
  }
}

