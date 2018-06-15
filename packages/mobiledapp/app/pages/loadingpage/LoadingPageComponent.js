import React, { Component } from 'react';
import styles from './LoadingPageComponentStyle';
import { ActivityIndicator, Image, Text, ToastAndroid, View } from 'react-native';

const visibleDotsArray = ['. ', '. .', '. . .', '. .', '. '];
const hiddenDotsArray = ['. .', ' .', '', ' .', '. .'];
let setIntervalId;

export default class LoadingPageComponent extends Component {

  constructor(args) {
    super(args);
    this.state = {visibleDots: '', hiddenDots: '. . .'};
    this.requester = this.props.requester;
  }

  async componentDidMount() {

    setIntervalId = setInterval(() => {
      this.setState({visibleDots: visibleDotsArray[0]});
      this.setState({hiddenDots: hiddenDotsArray[0]});
      visibleDotsArray.unshift(visibleDotsArray.pop());
      hiddenDotsArray.unshift(hiddenDotsArray.pop());
    }, 500);

    let transactionHash;

    try {
      transactionHash = await this.requester.makeRequest();
    } catch (error) {
      this.props.onFailure(error);
      return;
    }

    this.props.onSuccess(transactionHash);
  }

  async componentWillUnmount() {
    clearInterval(setIntervalId);
    await this.requester.cancel();
  }

  render() {

    return (

      <View style={styles.container}>

        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../../../assets/images/kudos.png')}/>
        </View>

        <View style={styles.loadingTextContainer}>
          <Text style={styles.text}>{this.props.loadingMessage} </Text>
          <Text style={styles.visibleDots}>{this.state.visibleDots}</Text>
          <Text style={styles.hiddenDots}>{this.state.hiddenDots}</Text>
        </View>

        <View style={styles.spacer}/>
      </View>
    );
  }
}