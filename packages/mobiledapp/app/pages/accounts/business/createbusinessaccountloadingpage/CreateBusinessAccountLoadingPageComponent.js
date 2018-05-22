import React, { Component } from 'react';
import styles from './CreateBusinessAccountLoadingPageComponentStyle';
import { View, Image, Text, ActivityIndicator, ToastAndroid } from "react-native";
import { default as localStorage } from 'react-native-sensitive-info';
import RegisterAsBusinessRequester from '../../../../api/RegisterAsBusinessRequester';

const visibleDotsArray = ['. ', '. .', '. . .', '. .', '. '];
const hiddenDotsArray = ['. .', ' .', '', ' .', '. .'];
let setIntervalId;

class CreateBusinessAccountLoadingPageComponent extends Component {

  constructor(args) {
    super(args);
    this.state = {visibleDots: '', hiddenDots: '. . .', isBusiness: false};
    this.registerAsBusinessRequester = new RegisterAsBusinessRequester();
  }

  async componentDidMount() {

    setIntervalId = setInterval(() => {
      this.setState({visibleDots: visibleDotsArray[0]});
      this.setState({hiddenDots: hiddenDotsArray[0]});
      visibleDotsArray.unshift(visibleDotsArray.pop());
      hiddenDotsArray.unshift(hiddenDotsArray.pop());
    }, 500);


    const businessAccountAddress = await localStorage.getItem('kudosAccountAddress', {
      keychainService: 'kudosKeychain'
    });

    console.log("business account address: " + businessAccountAddress);
    console.log("business name: " + this.props.businessName);
    console.log("business description: " + this.props.businessDescription);

    try {

      const result = await this.registerAsBusinessRequester.makeRequest(businessAccountAddress, this.props.businessName, this.props.businessDescription);

      this.props.navigator.push({
        screen: 'BusinessEmployeesComponent',
        navigatorStyle: {
          navBarHidden: true
        }
      });

    } catch (error) {

      if (!error.message.toLowerCase().includes('abort')) {
        // TODO - display some kind of error message
        console.log(error);
      }
    }
  }

  async componentWillUnmount() {
    clearInterval(setIntervalId);
    await this.registerAsBusinessRequester.cancel();
  }

  render() {

    return (

      <View style={styles.container}>

        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("../../../../../assets/images/kudos.png")}/>
        </View>

        <View style={styles.loadingTextContainer}>
          <Text style={styles.text}>Creating Account </Text>
          <Text style={styles.visibleDots}>{this.state.visibleDots}</Text>
          <Text style={styles.hiddenDots}>{this.state.hiddenDots}</Text>
        </View>

        <View style={styles.spacer}/>
      </View>
    );
  }
}

export default CreateBusinessAccountLoadingPageComponent;
