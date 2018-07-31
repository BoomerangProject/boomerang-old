import React, { Component } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, ToastAndroid, Clipboard } from 'react-native';
import styles from './CreateWorkerAccountComponentStyle';
import { getItem } from '../../../services/LocalStorageService';
import Navigator from '../../../util/Navigator';
import RegisterAsWorkerRequester from '../../../api/write/RegisterAsWorkerRequester';

export default class CreateWorkerAccountComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {workerName: ''};
    this.okayButtonIsEnabled = false;
  }

  componentWillUpdate(nextProps, nextState) {

    if (nextState.workerName.length > 0) {
      this.okayButtonIsEnabled = true;
    } else {
      this.okayButtonIsEnabled = false;
    }
  }

  async onClickOfOkayButton() {

    if (this.okayButtonIsEnabled) {

      const workerAddress = await getItem('boomerangAccountAddress');

      const workerName = this.state.workerName;
      const businessAddress = '0xfad1472d56f1a6f9c204ac555cc8baee0e5409be';
      const registerAsWorkerRequester = new RegisterAsWorkerRequester(workerAddress, businessAddress, workerName);

      const props = {
        requester: registerAsWorkerRequester,
        loadingMessage: 'Creating Account',
        onSuccess: this.onSuccess.bind(this),
        onFailure: this.onFailure.bind(this)
      };

      Navigator.init(this).pushLoadingPage(props);
    }
  }

  onSuccess(transactionHash) {
    console.log('transactionHash: ' + transactionHash);

    const props = {
      workerName: this.state.workerName
    };

    Navigator.init(this).startNewAppToWorkerHomePage(props);
  }

  onFailure(error) {
    ToastAndroid.show('we have failure: ' + error.message, ToastAndroid.SHORT);


    // if (!error.message.toLowerCase().includes('abort')) {
    //   // TODO - display some kind of error message
    //   console.log(error);
    // }
  }

  okayButton() {

    if (this.okayButtonIsEnabled) {
      return (
        <TouchableOpacity
          style={styles.okayButtonContainer}
          onPress={this.onClickOfOkayButton.bind(this)}>
          <Text style={styles.okayButton}>ok</Text>
        </TouchableOpacity>
      );
    }
  }

  render() {

    return (
      <View style={styles.container}>

        <View style={{flex: 1}}/>

        <Image style={styles.logo} source={require('../../../../assets/images/boomerang.png')}/>

        <Text style={styles.title}>Create Worker Account</Text>

        <View style={{flex: 1}}/>

        <TextInput style={styles.workerNameTextInput}
                   placeholder='name'
                   onChangeText={(workerName) => this.setState({workerName})}/>

        <View style={{flex: 2}}/>

        {this.okayButton()}
      </View>
    );
  }
}
