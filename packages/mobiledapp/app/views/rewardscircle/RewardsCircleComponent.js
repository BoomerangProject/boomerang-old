import React, { Component } from 'react';
import styles from './RewardsCircleComponentStyle';
import { View, TouchableHighlight, Text, ToastAndroid } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';

export default class RewardsCircleComponent extends Component {

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  constructor(args) {
    super(args);

    let numberOfRewardCyclesArray = [];

    for (let i = 0; i < this.props.numberOfRewardLevels; i++) {
      numberOfRewardCyclesArray.push(this.props.numberOfRewardCycles);
    }

    let numberOfRewardStepsArray = [];

    for (let i = 0; i < this.props.numberOfRewardLevels; i++) {
      numberOfRewardStepsArray.push(this.props.numberOfRewardSteps);
      // numberOfRewardStepsArray.push(this.getRandomInt(2,10));
    }

    this.state = {
      numberOfRewardCycles: numberOfRewardCyclesArray,
      numberOfRewardLevels: this.props.numberOfRewardLevels,
      numberOfRewardSteps: numberOfRewardStepsArray,
      progress: this.props.progress
    };
  }



  componentWillReceiveProps(nextProps) {

    let numberOfRewardCyclesArray = [];

    for (let i = 0; i < nextProps.numberOfRewardLevels; i++) {
      numberOfRewardCyclesArray.push(nextProps.numberOfRewardCycles);
    }

    let numberOfRewardStepsArray = [];

    for (let i = 0; i < nextProps.numberOfRewardLevels; i++) {
      numberOfRewardStepsArray.push(nextProps.numberOfRewardSteps);
      // numberOfRewardStepsArray.push(this.getRandomInt(2,10));
    }

    this.setState({
      numberOfRewardCycles: numberOfRewardCyclesArray,
      numberOfRewardLevels: nextProps.numberOfRewardLevels,
      numberOfRewardSteps: numberOfRewardStepsArray,
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

  describeArc(x, y, innerRadius, outerRadius, startAngle, endAngle, rotation){

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

    const angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

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

      let color = this.getNextColor();
      let width = (outerSize - innerSize) / 2 / this.state.numberOfRewardLevels / this.state.numberOfRewardCycles[i];

      for (let j = 0; j < this.state.numberOfRewardCycles[i]; j++) {

        const stepArcSize = 360/this.state.numberOfRewardSteps[i];
        for (let k = 0, theta1 = 0, theta2 = stepArcSize; k < this.state.numberOfRewardSteps[i]; k++, theta1 += stepArcSize, theta2 += stepArcSize) {

          circles.push(
                <Path
                  key={i.toString() + j.toString() + k.toString()}
                  x={margin}
                  y={margin}
                  stroke='black'
                  strokeWidth='0.1'
                  strokeOpacity={0.5}
                  d={this.describeArc(previousSize/2, previousSize/2, previousSize/2-width, previousSize/2, theta1, theta2, rotation)}
                  fill={color}
                  fillOpacity={0.1}
                />
          );
        }

        rotation = rotation + stepArcSize/2;

        previousSize = previousSize - 2 * width;
        margin = margin + width;
      }
    }

    circles.push(
      <Circle
        key='inner'
        cx={outerSize/2}
        cy={outerSize/2}
        r={innerSize/2}
        fill='#ffed89'
      />
    );

    console.log('circles.length: ' + circles.length);

    return (

      <View style={styles.container}>
        <Svg width={outerDiameter} height={outerDiameter}>
          {circles}
        </Svg>
      </View>
    );
  }
}