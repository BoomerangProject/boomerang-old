import React, { Component } from 'react';
import { Button, Image, Text, ToastAndroid, View } from "react-native";
import styles from './BusinessEmployeesComponentStyle';
import Navigator from '../../../../util/Navigator';
import WorkerListRequester from "../../../../api/WorkerListRequester";
import { default as localStorage } from 'react-native-sensitive-info';

class BusinessEmployeesComponent extends Component {

  constructor(props) {
    super(props);
    this.workerListRequester = new WorkerListRequester();
  }

  async componentDidMount() {
    const kudosAccountAddress = await localStorage.getItem('kudosAccountAddress', {
      keychainService: 'kudosKeychain'
    });

    const something = await this.workerListRequester.makeRequest(kudosAccountAddress);
    console.log('something: ' + something);
  }

  async onClickOfAddEmployeeButton() {
    Navigator.init(this).goToAddEmployeePage();
  }

  render() {

    return (

      <View style={styles.container}>

        <View style={{flex: 1}}/>

        <Button
          onPress={this.onClickOfAddEmployeeButton.bind(this)}
          title="add employee"
        />

        <View style={{flex: 1}}/>

        <View style={{flex: 1}}/>
      </View>
    );
  }
}

export default BusinessEmployeesComponent;
