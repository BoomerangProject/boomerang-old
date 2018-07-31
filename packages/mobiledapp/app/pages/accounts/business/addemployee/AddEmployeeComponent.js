import React, { Component } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, ToastAndroid, Clipboard } from 'react-native';
import styles from './AddEmployeeComponentStyle';
import Navigator from '../../../../util/Navigator';
import AddWorkerRequester from '../../../../api/write/AddWorkerRequester';
import { getItem } from '../../../../services/LocalStorageService';

export default class AddEmployeeComponent extends Component {

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

      const businessAddress = await getItem('boomerangAccountAddress');

      const addWorkerRequester = new AddWorkerRequester(this.state.workerAddress, businessAddress);

      const props = {
        requester: addWorkerRequester,
        loadingMessage: 'Adding Employee',
        onSuccess: this.onSuccess.bind(this),
        onFailure: this.onFailure.bind(this)
      };

      Navigator.init(this).pushLoadingPage(props);
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

        <Image style={styles.logo} source={require('../../../../../assets/images/boomerang.png')}/>

        <Text style={styles.title}>Add Employee</Text>

        <View style={{flex: 1}}/>

        <TextInput style={styles.workerAddressTextInput}
                   placeholder='employee address'
                   onChangeText={(workerAddress) => this.setState({workerAddress})}/>

        <View style={{flex: 2}}/>

        {this.okayButton()}
      </View>
    );
  }
}