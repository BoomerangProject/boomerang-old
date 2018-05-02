import React, { Component } from 'react';
import { View, Text } from "react-native";
import styles from './BusinessAccountComponentStyle';

class BusinessAccountComponent extends Component {

  render() {

    return (

      <View style={styles.container}>
        <Text>Business Account</Text>
      </View>
    );
  }
}

export default BusinessAccountComponent;
