import React, { Component } from 'react';
import styles from './RewardsCircleComponentStyle';
import { View, TouchableHighlight, Text, ToastAndroid } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { getColor } from '../../util/Colors';

const uuidv4 = require('uuid/v4');

export default class RewardsCircleComponent extends Component {

  constructor(args) {
    super(args);

    this.state = {
      minNumberOfRewardCycles: this.props.minNumberOfRewardCycles,
      maxNumberOfRewardCycles: this.props.maxNumberOfRewardCycles,
      numberOfRewardLevels: this.props.numberOfRewardLevels,
      numberOfRewardSteps: this.props.numberOfRewardSteps,
      rewardStep: this.props.rewardStep,
      rewardCycle: this.props.rewardCycle,
      rewardLevel: this.props.rewardLevel,
      levelDistributionFactor: this.props.levelDistributionFactor,
    };
  }

  componentWillReceiveProps(nextProps) {

    this.setState({
      minNumberOfRewardCycles: nextProps.minNumberOfRewardCycles,
      maxNumberOfRewardCycles: nextProps.maxNumberOfRewardCycles,
      numberOfRewardLevels: nextProps.numberOfRewardLevels,
      numberOfRewardSteps: nextProps.numberOfRewardSteps,
      rewardStep: nextProps.rewardStep,
      rewardCycle: nextProps.rewardCycle,
      rewardLevel: nextProps.rewardLevel,
      levelDistributionFactor: nextProps.levelDistributionFactor,
    });
  }

  describeArc(x, y, innerRadius, outerRadius, startAngle, endAngle, rotation) {

    startAngle = startAngle + rotation;
    endAngle = endAngle + rotation;

    const innerStart = this.polarToCartesian(x, y, innerRadius, endAngle);
    const innerEnd = this.polarToCartesian(x, y, innerRadius, startAngle);
    const outerStart = this.polarToCartesian(x, y, outerRadius, endAngle);
    const outerEnd = this.polarToCartesian(x, y, outerRadius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
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
      // console.log('reward level: ' + (i + 1) + ", number of reward cycles: " + this.getNumberOfRewardCyclesForRewardLevel(i + 1));
    }

    // console.log('number of reward cycles: ' + numberOfRewardCycles);

    return numberOfRewardCycles;
  }

  getNumberOfRewardCyclesForRewardLevel(rewardLevel) {

    const leftTerm = (1 - this.state.levelDistributionFactor) / this.state.numberOfRewardLevels;
    const rightTerm = this.state.levelDistributionFactor * (Math.exp(rewardLevel) - 1) / (Math.exp(this.state.numberOfRewardLevels) - 1);
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

    const outerSize = 250;
    const innerSize = 10;

    let circles = [];

    let previousSize = outerSize;
    let margin = 0;
    let rotation = 0;

    for (let i = 0; i < this.state.numberOfRewardLevels; i++) {

      let color = getColor(i);
      let width = (outerSize - innerSize) / 2 / this.totalNumberOfRewardCycles();

      const numberOfRewardCycles = this.getNumberOfRewardCyclesForRewardLevel(i + 1);

      for (let j = 0; j < numberOfRewardCycles; j++) {

        let stepArcSize = 360 / this.state.numberOfRewardSteps;

        if (stepArcSize === 360) {
          stepArcSize = 359.9;
        }

        for (let k = 0, theta1 = 0, theta2 = stepArcSize; k < this.state.numberOfRewardSteps; k++, theta1 += stepArcSize, theta2 += stepArcSize) {

          circles.push(
            <Path
              key={uuidv4()}
              x={margin}
              y={margin}
              stroke='black'
              strokeWidth='0.1'
              strokeOpacity={0.5}
              d={this.describeArc(previousSize / 2, previousSize / 2, previousSize / 2 - width, previousSize / 2, theta1, theta2, rotation)}
              fill={color}
              fillOpacity={0.1}
            />
          );
        }

        // rotation = rotation + stepArcSize/2;
        rotation = rotation + 15;

        previousSize = previousSize - 2 * width;
        margin = margin + width;
      }
    }

    let filledCircles = [];

    previousSize = outerSize;
    margin = 0;
    rotation = 0;

    for (let i = 0; i < this.state.rewardLevel; i++) {

      let color = getColor(i);
      let width = (outerSize - innerSize) / 2 / this.totalNumberOfRewardCycles();

      let numberOfRewardCycles;
      if (i === this.state.rewardLevel - 1) {
        numberOfRewardCycles = this.getNumberOfRewardCyclesForRewardLevel(i + 1);
        // numberOfRewardCycles = this.state.rewardCycle;
      } else {
        numberOfRewardCycles = this.getNumberOfRewardCyclesForRewardLevel(i + 1);
      }

      for (let j = 0; j < numberOfRewardCycles; j++) {

        let stepArcSize = 360 / this.state.numberOfRewardSteps;

        if (stepArcSize === 360) {
          stepArcSize = 359.9;
        }

        let numberOfSteps;
        if (i === this.state.rewardLevel - 1 && j === this.state.rewardCycle - 1) {
          numberOfSteps = this.state.rewardStep;
        } else {
          numberOfSteps = this.state.numberOfRewardSteps;
        }

        for (let k = 0, theta1 = 0, theta2 = stepArcSize; k < numberOfSteps; k++, theta1 += stepArcSize, theta2 += stepArcSize) {

          filledCircles.push(
            <Path
              key={uuidv4()}
              x={margin}
              y={margin}
              stroke='black'
              strokeWidth='0.1'
              strokeOpacity={0.5}
              d={this.describeArc(previousSize / 2, previousSize / 2, previousSize / 2 - width, previousSize / 2, theta1, theta2, rotation)}
              fill={color}
            />
          );
        }

        // rotation = rotation + stepArcSize/2;
        rotation = rotation + 15;

        previousSize = previousSize - 2 * width;
        margin = margin + width;
      }
    }

    circles.push(
      <Circle
        key='inner'
        cx={outerSize / 2}
        cy={outerSize / 2}
        r={innerSize / 2}
        fill='#ffed89'
      />
    );

    console.log('circles.length: ' + circles.length);

    return (

      <View style={this.props.style}>
        <Svg width={outerSize} height={outerSize}>
          {circles}
          {filledCircles}
        </Svg>
      </View>
    );
  }
}