import React, { Component } from 'react';
import styles from './AddEmployeeLoadingPageComponentStyle';
import { View, Image, Text, ActivityIndicator, ToastAndroid } from "react-native";
import { default as localStorage } from 'react-native-sensitive-info';
import WorkerListRequester from '../../../../api/WorkerListRequester';
import Navigator from '../../../../util/Navigator';

const visibleDotsArray = ['. ', '. .', '. . .', '. .', '. '];
const hiddenDotsArray = ['. .', ' .', '', ' .', '. .'];
let setIntervalId;

class AddEmployeeLoadingPageComponent extends Component {

  constructor(args) {
    super(args);
    this.state = {visibleDots: '', hiddenDots: '. . .', isBusiness: false};
    this.workerListRequester = new WorkerListRequester();
  }

  async componentDidMount() {

    setIntervalId = setInterval(() => {
      this.setState({visibleDots: visibleDotsArray[0]});
      this.setState({hiddenDots: hiddenDotsArray[0]});
      visibleDotsArray.unshift(visibleDotsArray.pop());
      hiddenDotsArray.unshift(hiddenDotsArray.pop());
    }, 500);

    const kudosAccountAddress = await localStorage.getItem('kudosAccountAddress', {
      keychainService: 'kudosKeychain'
    });

    try {

      const transactionHash = await this.workerListRequester.makeRequest(kudosAccountAddress);

      const props = {
        transactionHash,
        navigator: this.props.navigator,
      };

      Navigator.init(this).goToBusinessEmployeesPage(props);

    } catch (error) {

      if (!error.message.toLowerCase().includes('abort')) {
        // TODO - display some kind of error message
        console.log(error);
      }
    }
  }

  async componentWillUnmount() {
    clearInterval(setIntervalId);
    await this.workerListRequester.cancel();
  }

  render() {

    return (

      <View style={styles.container}>

        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("../../../../assets/images/kudos.png")}/>
        </View>

        <View style={styles.loadingTextContainer}>
          <Text style={styles.text}>Adding Employee </Text>
          <Text style={styles.visibleDots}>{this.state.visibleDots}</Text>
          <Text style={styles.hiddenDots}>{this.state.hiddenDots}</Text>
        </View>

        <View style={styles.spacer}/>
      </View>
    );
  }
}

export default AddEmployeeLoadingPageComponent;
