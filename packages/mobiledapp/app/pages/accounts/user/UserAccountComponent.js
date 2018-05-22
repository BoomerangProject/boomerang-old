import React, { Component } from 'react';
import { View, Text } from "react-native";
import styles from './UserAccountComponentStyle';

class UserAccountComponent extends Component {

  render() {

    return (

      <View style={styles.container}>
        <Text>User Account</Text>
      </View>
    );
  }
}

export default UserAccountComponent;
