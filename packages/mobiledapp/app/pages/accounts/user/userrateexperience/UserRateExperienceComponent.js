import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './UserRateExperienceComponentStyle';

export default class UserAccountComponent extends Component {

  constructor(args) {
    super(args);
  }

  async componentDidMount() {

  }

  render() {

    return (

      <View style={styles.container}>

        <View style={{flex: 1}}/>

        <Text style={styles.profileText}>rate experience</Text>

        <View style={{flex: 1}}/>

        <TextInput style={styles.businessNameTextInput}
                   placeholder='name'
                   onChangeText={(businessName) => this.setState({businessName})}/>

        <View style={{flex: 4}}/>
      </View>
    );
  }
}
