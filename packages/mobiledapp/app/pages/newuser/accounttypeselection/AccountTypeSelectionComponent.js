import React, { Component } from 'react';
import styles from './AccountTypeSelectionComponentStyle';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import Navigator from '../../../util/Navigator';
import { isLoggedIn } from '../../../services/LocalStorageService';

export default class AccountTypeSelectionComponent extends Component {

  async componentWillMount() {
    this.isLoggedIn = await isLoggedIn();
  }

  async onClickOfUserAccount() {

    if (this.isLoggedIn) {
      Navigator.init(this).resetToUserAccountPage();
    } else {
      Navigator.init(this).pushCreateUserAccountPage();
    }
  }

  async onClickOfWorkerAccount() {

    if (this.isLoggedIn) {
      Navigator.init(this).resetToWorkerAccountPage();
    } else {
      Navigator.init(this).pushCreateWorkerAccountPage();
    }
  }

  async onClickOfBusinessAccount() {

    if (this.isLoggedIn) {
      Navigator.init(this).resetToBusinessAccountPage();
    } else {
      Navigator.init(this).pushCreateBusinessAccountPage();
    }
  }

  render() {

    return (

      <View style={styles.container}>

        <View style={{flex: 1}}/>

        <Image style={styles.logo} source={require('../../../../assets/images/kudos.png')}/>
        <Text style={styles.title}>choose your account type</Text>

        <View style={{flex: 1}}/>

        <TouchableOpacity
          style={styles.userAccountButtonContainer}
          onPress={this.onClickOfUserAccount.bind(this)}>
          <Text style={styles.userAccountButton}>user</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.workerAccountButtonContainer}
          onPress={this.onClickOfWorkerAccount.bind(this)}>
          <Text style={styles.workerAccountButton}>worker</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.businessAccountButtonContainer}
          onPress={this.onClickOfBusinessAccount.bind(this)}>
          <Text style={styles.businessAccountButton}>business</Text>
        </TouchableOpacity>

        <View style={{flex: 2}}/>
      </View>
    );
  }
}
