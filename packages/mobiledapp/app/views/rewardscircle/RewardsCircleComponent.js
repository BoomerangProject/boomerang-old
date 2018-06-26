import React, { Component } from 'react';
import styles from './RewardsCircleComponentStyle';
import { View, TouchableHighlight, Text, ToastAndroid } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';

const uuidv4 = require('uuid/v4');

export default class RewardsCircleComponent extends Component {

  constructor(args) {
    super(args);

    this.state = {
      numberOfRewardCycles: this.props.numberOfRewardCycles,
      numberOfRewardLevels: this.props.numberOfRewardLevels,
      numberOfRewardSteps: this.props.numberOfRewardSteps,
      workerRewardStep: this.props.workerRewardStep,
      workerRewardCycle: this.props.workerRewardCycle,
      workerRewardLevel: this.props.workerRewardLevel,
      progress: this.props.progress
    };
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  componentWillReceiveProps(nextProps) {

    this.setState({
      numberOfRewardCycles: nextProps.numberOfRewardCycles,
      numberOfRewardLevels: nextProps.numberOfRewardLevels,
      numberOfRewardSteps: nextProps.numberOfRewardSteps,
      workerRewardStep: nextProps.workerRewardStep,
      workerRewardCycle: nextProps.workerRewardCycle,
      workerRewardLevel: nextProps.workerRewardLevel,
      progress: nextProps.progress
    });
  }

  colorIndex = 0;

  getNextColor() {
    // let colors = ['#002A1C', '#5DD0C2', '#2A7567'];
    let colors = ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#bc80bd', '#ccebc5', '#ffed6f'];
    let nextColor = colors[this.colorIndex];
    this.colorIndex = (this.colorIndex + 1) % colors.length;
    return nextColor;
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

  render() {

    const outerSize = 300;
    const outerDiameter = 300;
    const innerSize = 10;

    let circles = [];

    let previousSize = outerSize;
    let margin = 0;
    let rotation = 0;

    for (let i = 0; i < this.state.numberOfRewardLevels; i++) {

      let color = this.getColor(i);
      let width = (outerSize - innerSize) / 2 / this.state.numberOfRewardLevels / this.state.numberOfRewardCycles;

      for (let j = 0; j < this.state.numberOfRewardCycles; j++) {

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

    for (let i = 0; i < this.state.workerRewardLevel; i++) {

      let color = this.getColor(i);
      let width = (outerSize - innerSize) / 2 / this.state.numberOfRewardLevels / this.state.numberOfRewardCycles;

      let numberOfCycles;

      if (i === this.state.workerRewardLevel - 1) {
        numberOfCycles = this.state.workerRewardCycle;
      } else {
        numberOfCycles = this.state.numberOfRewardCycles;
      }

      for (let j = 0; j < numberOfCycles; j++) {

        let stepArcSize = 360 / this.state.numberOfRewardSteps;

        if (stepArcSize === 360) {
          stepArcSize = 359.9;
        }

        let numberOfSteps;
        if (i === this.state.workerRewardLevel - 1 && j === this.state.workerRewardCycle - 1) {
          numberOfSteps = this.state.workerRewardStep;
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

      <View style={styles.container}>
        <Svg width={outerDiameter} height={outerDiameter}>
          {circles}
          {filledCircles}
        </Svg>
      </View>
    );
  }
}