import React, { Component } from 'react';
import styles from './RewardRatingDistributionStarGraphComponentStyle';
import Svg, { Rect, Path } from 'react-native-svg';
import { Text, TextInput, ToastAndroid, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class RewardRatingDistributionStarGraphComponent extends Component {

  constructor(args) {
    super(args);

    this.state = {
      ratingRewardPercentages: this.props.ratingRewardPercentages
    };
  }

  render() {

    const height = 100;
    const width = this.props.style.width;
    const textInputHeight = 36;
    const textInputMargin = 2;

    return (

      <View style={styles.container}>

        <View style={styles.container}>

          <Svg style={this.props.style} width={width} height={height}>

            <Rect
              x={width / 5 * 0}
              y={height - this.state.ratingRewardPercentages[0]}
              width={width / 5}
              height={this.state.ratingRewardPercentages[0]}
              fill="#80b1d3"
              strokeWidth="0.1"
              stroke='black'
            />

            <Rect
              x={width / 5 * 1}
              y={height - this.state.ratingRewardPercentages[1]}
              width={width / 5}
              height={this.state.ratingRewardPercentages[1]}
              fill="#80b1d3"
              strokeWidth="0.1"
              stroke='black'
            />

            <Rect
              x={width / 5 * 2}
              y={height - this.state.ratingRewardPercentages[2]}
              width={width / 5}
              height={this.state.ratingRewardPercentages[2]}
              fill="#80b1d3"
              strokeWidth="0.1"
              stroke='black'
            />

            <Rect
              x={width / 5 * 3}
              y={height - this.state.ratingRewardPercentages[3]}
              width={width / 5}
              height={this.state.ratingRewardPercentages[3]}
              fill="#80b1d3"
              strokeWidth="0.1"
              stroke='black'
            />

            <Rect
              x={width / 5 * 4}
              y={height - this.state.ratingRewardPercentages[4]}
              width={width / 5}
              height={this.state.ratingRewardPercentages[4]}
              fill="#80b1d3"
              strokeWidth="0.1"
              stroke='black'
            />
          </Svg>

          <View style={{
            marginTop: 4,
            position: 'absolute',
            flexDirection: 'row',
            width: this.props.style.width,
            justifyContent: 'space-around'
          }}>

            <TextInput style={{
              width: 36,
              height: textInputHeight,
              marginTop: height - this.state.ratingRewardPercentages[0] - textInputHeight - textInputMargin,
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 10,
              fontFamily: 'WorkSans-Regular',
              color: 'black',
              textAlign: 'center',
              borderColor: '#6F877F',
              backgroundColor: 'white'
            }}
                       defaultValue={this.state.ratingRewardPercentages[0].toString()}
                       maxLength={3}
                       selectionColor='#6F877F'
                       placeholderTextColor='#6F877F'
                       underlineColorAndroid='#6F877F'/>

            <TextInput style={{
              width: 36,
              height: textInputHeight,
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 10,
              marginTop: height - this.state.ratingRewardPercentages[1] - textInputHeight - textInputMargin,
              fontFamily: 'WorkSans-Regular',
              color: 'black',
              textAlign: 'center',
              borderColor: '#6F877F',
              backgroundColor: 'white'
            }}
                       defaultValue={this.state.ratingRewardPercentages[1].toString()}
                       maxLength={3}
                       selectionColor='#6F877F'
                       placeholderTextColor='#6F877F'
                       underlineColorAndroid='#6F877F'/>

            <TextInput style={{
              width: 36,
              height: textInputHeight,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: height - this.state.ratingRewardPercentages[2] - textInputHeight - textInputMargin,
              fontSize: 10,
              fontFamily: 'WorkSans-Regular',
              color: 'black',
              textAlign: 'center',
              borderColor: '#6F877F',
              backgroundColor: 'white'
            }}
                       defaultValue={this.state.ratingRewardPercentages[2].toString()}
                       maxLength={3}
                       selectionColor='#6F877F'
                       placeholderTextColor='#6F877F'
                       underlineColorAndroid='#6F877F'/>

            <TextInput style={{
              width: 36,
              height: textInputHeight,
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 10,
              fontFamily: 'WorkSans-Regular',
              marginTop: height - this.state.ratingRewardPercentages[3] - textInputHeight - textInputMargin,
              color: 'black',
              textAlign: 'center',
              borderColor: '#6F877F',
              backgroundColor: 'white'
            }}
                       defaultValue={this.state.ratingRewardPercentages[3].toString()}
                       maxLength={3}
                       selectionColor='#6F877F'
                       placeholderTextColor='#6F877F'
                       underlineColorAndroid='#6F877F'/>

            <TextInput style={{
              width: 36,
              height: textInputHeight,
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 10,
              marginTop: height - this.state.ratingRewardPercentages[4] - textInputHeight - textInputMargin,
              fontFamily: 'WorkSans-Regular',
              color: 'black',
              textAlign: 'center',
              borderColor: '#6F877F',
              backgroundColor: 'white'
            }}
                       defaultValue={this.state.ratingRewardPercentages[4].toString()}
                       maxLength={3}
                       selectionColor='#6F877F'
                       placeholderTextColor='#6F877F'
                       underlineColorAndroid='#6F877F'/>
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


    );
  }
}

