import React, { Component } from 'react';
import { Button, Image, Text, ToastAndroid, View } from "react-native";
import styles from './BusinessEmployeesComponentStyle';
import Navigator from '../../../../util/Navigator';
import NumberOfWorkersRequester from "../../../../api/NumberOfWorkersRequester";
import { default as localStorage } from 'react-native-sensitive-info';

class BusinessEmployeesComponent extends Component {

  constructor(props) {
    super(props);
  }

  async componentDidMount() {

    const businessAddress = await localStorage.getItem('kudosAccountAddress', {
      keychainService: 'kudosKeychain'
    });

    this.numberOfWorkersRequester = new NumberOfWorkersRequester(businessAddress);

    const something = await this.numberOfWorkersRequester.makeRequest();
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
