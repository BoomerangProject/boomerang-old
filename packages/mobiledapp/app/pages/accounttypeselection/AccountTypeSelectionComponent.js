import React, { Component } from 'react';
import styles from './AccountTypeSelectionComponentStyle';
import { Image, Text, View, TouchableOpacity } from "react-native";

class AccountTypeSelectionComponent extends Component {

  onClickOfUserAccount() {
    this.goToLoadingPage('createUserAccount');
  }

  onClickOfWorkerAccount() {
    this.goToLoadingPage('createWorkerAccount');
  }

  onClickOfBusinessAccount() {
    this.goToLoadingPage('createBusinessAccount');
  }

  goToLoadingPage(action) {
    this.props.navigator.push({
      screen: 'LoadingPageComponent',
      navigatorStyle: {
        navBarHidden: true
      },
      passProps: {
        action
      }
    });
  }

  render() {

    return (

      <View style={styles.container}>

        <Image style={styles.logo} source={require("../../images/kudos.png")}/>
        <Text style={styles.title}>choose your account type</Text>

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
      </View>
    );
  }
}

export default AccountTypeSelectionComponent;
