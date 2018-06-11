import React, { Component } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, ToastAndroid, Clipboard } from 'react-native';
import styles from './AddEmployeeComponentStyle';
import Navigator from "../../../../util/Navigator";
import AddWorkerRequester from "../../../../api/write/AddWorkerRequester";
import { default as localStorage } from 'react-native-sensitive-info';

class AddEmployeeComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {workerAddress: ''};
    this.okayButtonIsEnabled = false;
  }

  componentWillUpdate(nextProps, nextState) {

    if (nextState.workerAddress.length > 0) {
      this.okayButtonIsEnabled = true;
    } else {
      this.okayButtonIsEnabled = false;
    }
  }

  async onClickOfOkayButton() {

    if (this.okayButtonIsEnabled) {

      const businessAddress = await localStorage.getItem('kudosAccountAddress', {
        keychainService: 'kudosKeychain'
      });

      const addWorkerRequester = new AddWorkerRequester(this.state.workerAddress, businessAddress);

      const props = {
        requester: addWorkerRequester,
        loadingMessage: 'Adding Employee',
        onSuccess: this.onSuccess.bind(this),
        onFailure: this.onFailure.bind(this)
      };

      Navigator.init(this).goToLoadingPage(props);
    }
  }

  onSuccess(transactionHash) {
    console.log('transactionHash: ' + transactionHash);
    Navigator.init(this).resetToBusinessEmployeesPage();
  }

  onFailure(error) {
    console.log(error.message);
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

        <Image style={styles.logo} source={require("../../../../../assets/images/kudos.png")}/>

        <Text style={styles.title}>Add Employee</Text>

        <View style={{flex: 1}}/>

        <TextInput style={styles.workerAddressTextInput}
                   placeholder="employee address"
                   onChangeText={(workerAddress) => this.setState({workerAddress})}/>

        <View style={{flex: 2}}/>

        {this.okayButton()}
      </View>
    );
  }
}

export default AddEmployeeComponent;
