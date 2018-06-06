import React, { Component } from 'react';
import styles from './NavigationDrawerComponentStyle';
import { Image, Text, View, TouchableHighlight, ToastAndroid } from "react-native";
import Navigator from "../../util/Navigator";

class NavigationDrawerComponent extends Component {

  onClickOfEmployeesButton() {
    Navigator.init(this).goToBusinessEmployeesPage();
    this.closeDrawer();
  }

  onClickOfAnalyticsButton() {
    ToastAndroid.show('analytics', ToastAndroid.SHORT);
  }

  onClickOfPerformanceRewardsButton() {
    ToastAndroid.show('performance rewards', ToastAndroid.SHORT);
  }

  onClickOfLoyaltyRewardsButton() {
    ToastAndroid.show('loyalty rewards', ToastAndroid.SHORT);
  }

  onClickOfSignOutRewardsButton() {
    ToastAndroid.show('sign out', ToastAndroid.SHORT);
  }

  closeDrawer() {
    this.props.navigator.toggleDrawer({side: 'left', to: 'closed'});
  }

  render() {

    return (

      <View style={styles.container}>

        <Image style={styles.logo} source={require("../../../assets/images/kudos.png")}/>

        <TouchableHighlight
          underlayColor='#FAFAFA'
          style={styles.employeesButtonContainer}
          onPress={this.onClickOfEmployeesButton.bind(this)}>
          <Text style={styles.employeesButton}>employees</Text>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor='#FAFAFA'
          style={styles.analyticsButtonContainer}
          onPress={this.onClickOfAnalyticsButton.bind(this)}>
          <Text style={styles.analyticsButton}>analytics</Text>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor='#FAFAFA'
          style={styles.performanceRewardsButtonContainer}
          onPress={this.onClickOfPerformanceRewardsButton.bind(this)}>
          <Text style={styles.performanceRewardsButton}>performance rewards</Text>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor='#FAFAFA'
          style={styles.loyaltyRewardsButtonContainer}
          onPress={this.onClickOfLoyaltyRewardsButton.bind(this)}>
          <Text style={styles.loyaltyRewardsButton}>loyalty rewards</Text>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor='#FAFAFA'
          style={styles.signOutButtonContainer}
          onPress={this.onClickOfSignOutRewardsButton.bind(this)}>
          <Text style={styles.signOutButton}>sign out</Text>
        </TouchableHighlight>

        <View style={{flex:1}}/>
      </View>
    );
  }
}

export default NavigationDrawerComponent;
