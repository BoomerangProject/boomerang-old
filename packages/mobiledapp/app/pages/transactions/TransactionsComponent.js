import React, { Component } from 'react';
import { View, Image, Text, ToastAndroid } from "react-native";
import styles from './TransactionsComponentStyle';

class TransactionsComponent extends Component {

  constructor(args) {
    super(args);
  }

  render() {

    return (

      <View style={styles.container}>

        <Text>this is the transactions page</Text>

      </View>
    );
  }
}

export default TransactionsComponent;
