import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './UserAccountComponentStyle';
import { getItem, setItem } from "../../../services/LocalStorageService";

export default class UserAccountComponent extends Component {

  async componentDidMount() {
    
    await setItem('isUser', 'true');
    await setItem('isLoggedIn', 'true');
  }

  render() {

    return (

      <View style={styles.container}>
        <Text>User Account</Text>
      </View>
    );
  }
}
