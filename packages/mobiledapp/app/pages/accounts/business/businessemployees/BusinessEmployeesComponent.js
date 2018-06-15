import React, { Component } from 'react';
import { Button, Image, Text, ToastAndroid, TouchableHighlight, View } from 'react-native';
import styles from './BusinessEmployeesComponentStyle';
import Navigator from '../../../../util/Navigator';
import NumberOfWorkersRequester from '../../../../api/read/NumberOfWorkersRequester';
import { getItem } from '../../../../services/LocalStorageService';
import BusinessHasApprovedWorkerRequester from '../../../../api/read/BusinessHasApprovedWorkerRequester';
import EmployeeListComponent from '../../../../views/employeelist/EmployeeList/EmployeeListComponent';

export default class BusinessEmployeesComponent extends Component {

  constructor(props) {
    super(props);
  }

  async componentDidMount() {

    const businessAddress = await getItem('kudosAccountAddress');

    this.numberOfWorkersRequester = new NumberOfWorkersRequester(businessAddress);

    const numberOfWorkers = await this.numberOfWorkersRequester.makeRequest();
    console.log('numberOfWorkers: ' + numberOfWorkers);


    console.log('businessAddress: ' + businessAddress);

    this.businessHasApprovedWorkerRequester = new BusinessHasApprovedWorkerRequester(businessAddress, '0x11c56a8b60a10323eb4402d698f9f97a0260d3d9');

    const hasBusinessApprovedWorker = await this.businessHasApprovedWorkerRequester.makeRequest();
    console.log('hasBusinessApprovedWorker: ' + hasBusinessApprovedWorker);
  }

  render() {

    return (

      <View style={styles.container}>

        <View style={{flex: 1}}/>

        <EmployeeListComponent navigator={this.props.navigator}/>

        <View style={{flex: 1}}/>
      </View>
    );
  }
}
