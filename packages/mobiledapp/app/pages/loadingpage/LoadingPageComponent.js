import React, { Component } from 'react';
import styles from './LoadingPageComponentStyle';
import { View, Image, Text, ActivityIndicator } from "react-native";

const visibleDotsArray = ['. ', '. .', '. . .', '. .', '. '];
const hiddenDotsArray = ['. .', ' .', '', ' .', '. .'];
let setIntervalId;

class LoadingPageComponent extends Component {

  constructor(args) {
    super(args);
    this.state = {visibleDots: '', hiddenDots: '. . .'};
  }

  componentDidMount() {

    setIntervalId = setInterval(() => {
      this.setState({visibleDots: visibleDotsArray[0]});
      this.setState({hiddenDots: hiddenDotsArray[0]});
      visibleDotsArray.unshift(visibleDotsArray.pop());
      hiddenDotsArray.unshift(hiddenDotsArray.pop());
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(setIntervalId);
  }

  render() {

    return (

      <View style={styles.container}>

        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("../../images/kudos.png")}/>
        </View>

        <View style={styles.loadingTextContainer}>
          <Text style={styles.text}>Loading Account </Text>
          <Text style={styles.visibleDots}>{this.state.visibleDots}</Text>
          <Text style={styles.hiddenDots}>{this.state.hiddenDots}</Text>
        </View>

        <View style={styles.spacer}/>
      </View>
    );
  }
}

export default LoadingPageComponent;
