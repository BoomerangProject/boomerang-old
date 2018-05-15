import React, { Component } from 'react';
import { View, Text, ToastAndroid } from "react-native";
import styles from './BusinessAccountComponentStyle';
import kudosContract from "../../services/KudosContractService";
import getEvents from '../../services/KudosEventsService';

class BusinessAccountComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {businessAccountAddress: '', businessName: '', businessDescription: ''};
  }

  async componentDidMount() {

    // const businessAccountAddress = await localStorage.getItem('kudosAccountAddress', {
    //   keychainService: 'kudosKeychain'
    // });

    const businessAccountAddress = '0xBFf5134aC1f86332fAb068D153B1e042C1f6B2B7';

    const events = await getEvents('RegisteredAsBusiness', {_businessAccountAddress: businessAccountAddress});

    events.map((event) => {
      console.log(JSON.stringify(event));
    });
  }

  async getBusinessInformation() {

  }

  render() {

    return (

      <View style={styles.container}>
        <Text>Business Account</Text>
      </View>
    );
  }
}

export default BusinessAccountComponent;
