import React, { Component } from 'react';
import styles from './RewardsCircleLevelSliceComponentStyle';
import { View, TouchableHighlight, Text, ToastAndroid } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

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

  getColor(index) {
    // let colors = ['#002A1C', '#5DD0C2', '#2A7567'];
    let colors = ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#bc80bd', '#ccebc5', '#ffed6f'];
    return colors[index];
  }

  describeArc(x, y, innerRadius, outerRadius, startAngle, endAngle, rotation) {

    startAngle = startAngle + rotation;
    endAngle = endAngle + rotation;

    const innerStart = this.polarToCartesian(x, y, innerRadius, endAngle);
    const innerEnd = this.polarToCartesian(x, y, innerRadius, startAngle);
    const outerStart = this.polarToCartesian(x, y, outerRadius, endAngle);
    const outerEnd = this.polarToCartesian(x, y, outerRadius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    console.log('innerStart: ' + innerStart.x + ", " + innerStart.y);
    console.log('innerEnd: ' + innerEnd.x + ", " + innerEnd.y);
    console.log('outerStart: ' + outerStart.x + ", " + outerStart.y);
    console.log('outerEnd: ' + outerEnd.x + ", " + outerEnd.y);

    const d = [
      "M", outerStart.x, outerStart.y,
      "A", outerRadius, outerRadius, 0, largeArcFlag, 0, outerEnd.x, outerEnd.y,
      "L", innerEnd.x, innerEnd.y,
      "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
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

  render() {

    const outerSize = 1800;
    let innerSize = 1000;
    
    let previousSize = outerSize;
    let xMargin = 0;
    let yMargin = 0;
    let x = previousSize / 2;
    let y = previousSize / 2;

    let theta1 = -4;
    let theta2 = 4;

    let circleSegments = [];

    previousSize = outerSize;

    for (let i = 0; i < this.state.numberOfRewardLevels; i++) {

      let color = this.getColor(i);
      let width = (outerSize - innerSize) / 2 / this.totalNumberOfRewardCycles();

      let numberOfRewardCycles;
      if (i === this.state.rewardLevel - 1) {
        numberOfRewardCycles = this.getNumberOfRewardCyclesForRewardLevel(i + 1);
        // numberOfRewardCycles = this.state.rewardCycle;
      } else {
        numberOfRewardCycles = this.getNumberOfRewardCyclesForRewardLevel(i + 1);
      }

      for (let j = 0; j < numberOfRewardCycles; j++) {

        circleSegments.push(
          <Path
            key={uuidv4()}
            x={xMargin}
            y={yMargin}
            stroke='black'
            strokeWidth='0.1'
            strokeOpacity={0.5}
            d={this.describeArc(x, y, previousSize / 2 - width, previousSize / 2, theta1, theta2, 0)}
            fill={color}
          />
        );

        previousSize = previousSize - 2*width;
        x = previousSize / 2;
        y = previousSize / 2;
        xMargin = xMargin + width;
        yMargin = yMargin + width;
        // innerSize = innerSize + 20;

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

    return (

      <View style={{width: 200, height: 400, alignItems: 'center',}}>
        <Svg width={outerSize} height={outerSize/2}>
          {circleSegments}
        </Svg>
      </View>
    );
  }
}

