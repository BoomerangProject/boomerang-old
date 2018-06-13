import React, { Component } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, ToastAndroid, Clipboard } from 'react-native';
import styles from './CreateUserAccountComponentStyle';
import { default as localStorage } from 'react-native-sensitive-info';
import Navigator from "../../../util/Navigator";
import RegisterAsUserRequester from "../../../api/write/RegisterAsUserRequester";

export default class CreateUserAccountComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {userName: ''};
    this.okayButtonIsEnabled = false;
  }

  componentWillUpdate(nextProps, nextState) {

    if (nextState.userName.length > 0) {
      this.okayButtonIsEnabled = true;
    } else {
      this.okayButtonIsEnabled = false;
    }
  }

  async onClickOfOkayButton() {

    if (this.okayButtonIsEnabled) {

      const userAddress = await localStorage.getItem('kudosAccountAddress', {
        keychainService: 'kudosKeychain'
      });

      const userName = this.state.userName;
      const registerAsUserRequester = new RegisterAsUserRequester(userName, userAddress);

      const props = {
        requester: registerAsUserRequester,
        loadingMessage: 'Creating Account',
        onSuccess: this.onSuccess.bind(this),
        onFailure: this.onFailure.bind(this)
      };

      Navigator.init(this).goToLoadingPage(props);
    }
  }

  onSuccess(transactionHash) {
    console.log('transactionHash: ' + transactionHash);

    const props = {
      userName: this.state.userName
    };

    Navigator.init(this).resetToBusinessEmployeesPage(props);
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

        <Image style={styles.logo} source={require("../../../../assets/images/kudos.png")}/>

        <Text style={styles.title}>Create User Account</Text>

        <View style={{flex: 1}}/>

        <TextInput style={styles.userNameTextInput}
                   placeholder="name"
                   onChangeText={(userName) => this.setState({userName})}/>

        <View style={{flex: 2}}/>

        {this.okayButton()}
      </View>
    );
  }
}
