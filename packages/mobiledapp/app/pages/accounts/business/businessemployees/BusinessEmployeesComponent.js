import React, { Component } from 'react';
import { Button, Image, Text, ToastAndroid, View } from "react-native";
import styles from './BusinessEmployeesComponentStyle';
import Navigator from '../../../../util/Navigator';
import NumberOfWorkersRequester from "../../../../api/read/NumberOfWorkersRequester";
import { default as localStorage } from 'react-native-sensitive-info';
import BusinessHasApprovedWorkerRequester from "../../../../api/read/BusinessHasApprovedWorkerRequester";
import BalanceComponent from "../../../../views/balance/BalanceComponent";

class BusinessEmployeesComponent extends Component {

  constructor(props) {
    super(props);
  }

  async componentDidMount() {

    const businessAddress = await localStorage.getItem('kudosAccountAddress', {
      keychainService: 'kudosKeychain'
    });

    this.numberOfWorkersRequester = new NumberOfWorkersRequester(businessAddress);

    const numberOfWorkers = await this.numberOfWorkersRequester.makeRequest();
    console.log('numberOfWorkers: ' + numberOfWorkers);


    this.businessHasApprovedWorkerRequester = new BusinessHasApprovedWorkerRequester(businessAddress, '0x11c56a8b60a10323eb4402d698f9f97a0260d3d9');

    const hasBusinessApprovedWorker = await this.businessHasApprovedWorkerRequester.makeRequest();
    console.log('hasBusinessApprovedWorker: ' + hasBusinessApprovedWorker);
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
        <BalanceComponent/>

        <View style={{flex: 1}}/>
      </View>
    );
  }
}

export default BusinessEmployeesComponent;
