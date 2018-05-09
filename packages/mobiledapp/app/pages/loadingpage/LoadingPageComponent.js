import React, { Component } from 'react';
import styles from './LoadingPageComponentStyle';
import { View, Image, Text, ActivityIndicator, ToastAndroid } from "react-native";
import kudosContract from '../../services/KudosContractService'
import { default as localStorage } from 'react-native-sensitive-info';
import GetBalanceRequester from '../../api/GetBalanceRequester';
import IsBusinessRequester from '../../api/IsBusinessRequester';
import RegisterAsBusinessRequester from '../../api/RegisterAsBusinessRequester';

const visibleDotsArray = ['. ', '. .', '. . .', '. .', '. '];
const hiddenDotsArray = ['. .', ' .', '', ' .', '. .'];
let setIntervalId;

class LoadingPageComponent extends Component {

  constructor(args) {
    super(args);
    this.state = {visibleDots: '', hiddenDots: '. . .', isBusiness: false};
    this.getBalanceRequester = new GetBalanceRequester();
    this.isBusinessRequester = new IsBusinessRequester();
    this.registerAsBusinessRequester = new RegisterAsBusinessRequester();
  }

  async componentDidMount() {

    setIntervalId = setInterval(() => {
      this.setState({visibleDots: visibleDotsArray[0]});
      this.setState({hiddenDots: hiddenDotsArray[0]});
      visibleDotsArray.unshift(visibleDotsArray.pop());
      hiddenDotsArray.unshift(hiddenDotsArray.pop());
    }, 500);


    switch (this.props.action) {
      case 'createUserAccount':

        let myBalance;
        try {
          myBalance = await this.getBalanceRequester.makeRequest("0xdcee2f1da7262362a962d456280a928f4f90bb5e");
          console.log("BaaAALANCE:: " + myBalance);
        } catch (error) {

          if (!error.message.toLowerCase().includes('abort')) {
            // TODO - display some kind of error message
          }
        }

        break;
      case 'createWorkerAccount':

        break;
      case 'createBusinessAccount':


        const kudosAccountAddress = await localStorage.getItem('kudosAccountAddress', {
          keychainService: 'kudosKeychain'
        });


        await this.checkBusinessStatus(kudosAccountAddress);

        let result;
        try {
          result = await this.registerAsBusinessRequester.makeRequest(kudosAccountAddress);
          console.log(JSON.stringify(result));
        } catch (error) {

          if (!error.message.toLowerCase().includes('abort')) {
            // TODO - display some kind of error message
            console.log(error);
          }
        }

        await this.checkBusinessStatus(kudosAccountAddress);

        break;
    }


  }

  async checkBusinessStatus(kudosAccountAddress) {

    let result;
    try {

      result = await this.isBusinessRequester.makeRequest(kudosAccountAddress);

      this.setState({ isBusiness: result.toString()});

      console.log("isBusiness: " + result);
    } catch (error) {

      if (!error.message.toLowerCase().includes('abort')) {
        // TODO - display some kind of error message
        console.log(error);
      }
    }

  }

  async componentWillUnmount() {
    clearInterval(setIntervalId);
    await this.getBalanceRequester.cancel();
    await this.isBusinessRequester.cancel();
    await this.registerAsBusinessRequester.cancel();
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

        <Text>isBusiness: {this.state.isBusiness}</Text>

      </View>
    );
  }
}

export default LoadingPageComponent;
