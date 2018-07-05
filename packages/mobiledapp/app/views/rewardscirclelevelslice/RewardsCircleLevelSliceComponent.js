import React, { Component } from 'react';
import styles from './RewardsCircleLevelSliceComponentStyle';
import { View, TouchableHighlight, Text, ToastAndroid } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import Dimensions from 'Dimensions';
import { getColor } from '../../util/Colors';

const uuidv4 = require('uuid/v4');

export default class RewardsCircleLevelSliceComponent extends Component {

  constructor(args) {
    super(args);

    this.state = {
      numberOfRewardLevels: this.props.numberOfRewardLevels,
      minNumberOfRewardCycles: this.props.minNumberOfRewardCycles,
      maxNumberOfRewardCycles: this.props.maxNumberOfRewardCycles,
      numberOfRewardSteps: this.props.numberOfRewardSteps,
      levelUpDifficultyFactor: this.props.levelUpDifficultyFactor
    };
  }

  describeArc(x, y, innerSize, outerSize, startAngle, endAngle, rotation) {

    startAngle = startAngle + rotation;
    endAngle = endAngle + rotation;

    const innerStart = this.polarToCartesian(x, y, innerSize, endAngle);
    const innerEnd = this.polarToCartesian(x, y, innerSize, startAngle);
    const outerStart = this.polarToCartesian(x, y, outerSize, endAngle);
    const outerEnd = this.polarToCartesian(x, y, outerSize, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    // console.log('innerStart: ' + innerStart.x + ", " + innerStart.y);
    // console.log('innerEnd: ' + innerEnd.x + ", " + innerEnd.y);
    // console.log('outerStart: ' + outerStart.x + ", " + outerStart.y);
    // console.log('outerEnd: ' + outerEnd.x + ", " + outerEnd.y);

    const d = [
      "M", outerStart.x, outerStart.y,
      "A", outerSize, outerSize, 0, largeArcFlag, 0, outerEnd.x, outerEnd.y,
      "L", innerEnd.x, innerEnd.y,
      "A", innerSize, innerSize, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
      "L", outerStart.x, outerStart.y, "Z"
    ].join(" ");

    return d;
  }

  polarToCartesian(centerX, centerY, radius, angleInDegrees) {

    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  totalNumberOfRewardCycles() {

    let numberOfRewardCycles = 0;

    for (let i = 0; i < this.state.numberOfRewardLevels; i++) {
      numberOfRewardCycles = numberOfRewardCycles + this.getNumberOfRewardCyclesForRewardLevel(i + 1);
    }

    return numberOfRewardCycles;
  }

  getNumberOfRewardCyclesForRewardLevel(rewardLevel) {

    const leftTerm = (1 - this.state.levelUpDifficultyFactor) / this.state.numberOfRewardLevels;
    const rightTerm = this.state.levelUpDifficultyFactor * (Math.exp(rewardLevel) - 1) / (Math.exp(this.state.numberOfRewardLevels) - 1);
    const curvePercentage = leftTerm + rightTerm;
    const value = Math.ceil(this.state.minNumberOfRewardCycles * this.state.numberOfRewardLevels * curvePercentage);

    if (value < this.state.minNumberOfRewardCycles) {
      return this.state.minNumberOfRewardCycles;
    }

    if (value > this.state.maxNumberOfRewardCycles) {
      return this.state.maxNumberOfRewardCycles;
    }

    return value;
  }

  getStartingSize(outerSize, innerSize) {

    let size = outerSize;

    for (let i = 0; i < this.state.numberOfRewardLevels; i++) {

      let width = (outerSize - innerSize) / 2 / this.totalNumberOfRewardCycles();
      let numberOfRewardCycles = this.getNumberOfRewardCyclesForRewardLevel(i + 1);

      for (let j = 0; j < numberOfRewardCycles; j++) {
        size = size - 2 * width;
      }
    }

    return size;
  }

  render() {

    // const {height, width} = Dimensions.get('window');

    const width = this.props.style.width;
    const height = this.props.style.height;

    const outerSize = (height)*2.7;
    const innerSize = 0.4*outerSize;

    // console.log('width: ' + width);
    // console.log('height: ' + height);
    // console.log('outerSize: ' + outerSize);
    // console.log('innerSize: ' + innerSize);

    let nextSize = this.getStartingSize(outerSize, innerSize);
    let xMargin = width/2 - innerSize/2;
    let yMargin = height/2 + (outerSize/2-innerSize/2)/2;

    let theta1 = -4;
    let theta2 = 4;

    let circleSegments = [];

    for (let i = 0; i < this.state.numberOfRewardLevels; i++) {

      let color = getColor(this.state.numberOfRewardLevels-1-i);
      let width = (outerSize - innerSize) / 2 / this.totalNumberOfRewardCycles();

      let numberOfRewardCycles = this.getNumberOfRewardCyclesForRewardLevel(this.state.numberOfRewardLevels-1-i+1);

      for (let j = 0; j < numberOfRewardCycles; j++) {

        circleSegments.push(
          <Path
            key={uuidv4()}
            x={xMargin}
            y={yMargin}
            stroke='black'
            strokeWidth='0.1'
            strokeOpacity={0.5}
            d={this.describeArc(nextSize / 2, nextSize / 2, nextSize / 2 + width, nextSize / 2, theta1, theta2, 0)}
            fill={color}
          />
        );

        nextSize = nextSize + 2 * width;
        xMargin = xMargin - width;
        yMargin = yMargin - width;

      }
    }

    //
    // circleSegments.push(
    //   <Circle
    //     key='inner'
    //     cx={outerSize / 2}
    //     cy={outerSize / 2}
    //     r={innerSize / 2}
    //     fill='#ffed89'
    //   />
    // );

    console.log('circle segments length: ' + circleSegments.length);

    console.log(JSON.stringify(this.props.style));

    return (

      <Svg style={this.props.style} width={this.props.style.width} height={this.props.style.height}>
        {circleSegments}
      </Svg>
    );
  }
}

