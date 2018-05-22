import React, { Component } from 'react';
import { View, Text } from "react-native";
import styles from './WorkerAccountComponentStyle';

class WorkerAccountComponent extends Component {

  render() {

    return (

      <View style={styles.container}>
        <Text>Worker Account</Text>
      </View>
    );
  }
}

export default WorkerAccountComponent;
