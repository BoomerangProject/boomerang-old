import React, { Component } from 'react';
import styles from './NavigationDrawerComponentStyle';
import { Image, Text, View, TouchableHighlight, ToastAndroid } from 'react-native';
import Navigator from '../../util/Navigator';
import { logOut } from '../../services/LocalStorageService';

export default class NavigationDrawerComponent extends Component {

  onClickOfEmployeesButton() {
    Navigator.init(this).pushBusinessEmployeesPage();
    this.closeDrawer();
  }

  onClickOfEmployersButton() {
    Navigator.init(this).pushWorkerEmployersPage();
    this.closeDrawer();
  }

  onClickOfAnalyticsButton() {
    Navigator.init(this).pushBusinessAnalyticsPage();
    this.closeDrawer();
  }

  onClickOfDefineWorkerRewardsButton() {
    Navigator.init(this).pushDefineWorkerRewardCirclesPage();
    this.closeDrawer();
  }

  onClickOfDefineUserRewardsButton() {
    Navigator.init(this).pushDefineUserRewardsPage();
    this.closeDrawer();
  }

  onClickOfWorkerRewardsButton() {
    Navigator.init(this).pushWorkerRewardsPage();
    this.closeDrawer();
  }

  onClickOfUserRewardsButton() {
    Navigator.init(this).pushUserRewardsPage();
    this.closeDrawer();
  }

  onClickOfTransactionsButton() {
    Navigator.init(this).pushTransactionsPage();
    this.closeDrawer();
  }

  async onClickOfSignOutButton() {

    await logOut();
    Navigator.init(this).resetToWelcomePage();
    this.closeDrawer();
  }

  closeDrawer() {
    this.props.navigator.toggleDrawer({side: 'left', to: 'closed'});
  }

  employeesButton() {
    return (
      <TouchableHighlight
        underlayColor='#FAFAFA'
        style={styles.navigationButtonContainer}
        onPress={this.onClickOfEmployeesButton.bind(this)}>
        <Text style={styles.navigationButton}>employees</Text>
      </TouchableHighlight>
    );
  }

  analyticsButton() {
    return (
      <TouchableHighlight
        underlayColor='#FAFAFA'
        style={styles.navigationButtonContainer}
        onPress={this.onClickOfAnalyticsButton.bind(this)}>
        <Text style={styles.navigationButton}>analytics</Text>
      </TouchableHighlight>
    );
  }

  definePerformanceRewardsButton() {
    return (
      <TouchableHighlight
        underlayColor='#FAFAFA'
        style={styles.navigationButtonContainer}
        onPress={this.onClickOfDefineWorkerRewardsButton.bind(this)}>
        <Text style={styles.navigationButton}>employee rewards</Text>
      </TouchableHighlight>
    );
  }

  defineLoyaltyRewardsButton() {
    return (
      <TouchableHighlight
        underlayColor='#FAFAFA'
        style={styles.navigationButtonContainer}
        onPress={this.onClickOfDefineUserRewardsButton.bind(this)}>
        <Text style={styles.navigationButton}>customer rewards</Text>
      </TouchableHighlight>
    );
  }

  employersButton() {
    return (
      <TouchableHighlight
        underlayColor='#FAFAFA'
        style={styles.navigationButtonContainer}
        onPress={this.onClickOfEmployersButton.bind(this)}>
        <Text style={styles.navigationButton}>employers</Text>
      </TouchableHighlight>
    );
  }

  performanceRewardsButton() {
    return (
      <TouchableHighlight
        underlayColor='#FAFAFA'
        style={styles.navigationButtonContainer}
        onPress={this.onClickOfWorkerRewardsButton.bind(this)}>
        <Text style={styles.navigationButton}>performance rewards</Text>
      </TouchableHighlight>
    );
  }

  loyaltyRewardsButton() {
    return (
      <TouchableHighlight
        underlayColor='#FAFAFA'
        style={styles.navigationButtonContainer}
        onPress={this.onClickOfUserRewardsButton.bind(this)}>
        <Text style={styles.navigationButton}>loyalty rewards</Text>
      </TouchableHighlight>
    );
  }


  render() {

    return (

      <View style={styles.container}>

        <Image style={styles.logo} source={require('../../../assets/images/kudos.png')}/>

        <View style={{flex: 1}}/>

        <View style={styles.divider}/>

        {this.props.userRole === 'business' && this.employeesButton()}
        {this.props.userRole === 'business' && this.analyticsButton()}
        {this.props.userRole === 'business' && this.definePerformanceRewardsButton()}
        {this.props.userRole === 'business' && this.defineLoyaltyRewardsButton()}

        {this.props.userRole === 'worker' && this.employersButton()}
        {this.props.userRole === 'worker' && this.performanceRewardsButton()}

        {this.props.userRole === 'user' && this.loyaltyRewardsButton()}

        <TouchableHighlight
          underlayColor='#FAFAFA'
          style={styles.navigationButtonContainer}
          onPress={this.onClickOfTransactionsButton.bind(this)}>
          <Text style={styles.navigationButton}>transactions</Text>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor='#FAFAFA'
          style={styles.navigationButtonContainer}
          onPress={this.onClickOfSignOutButton.bind(this)}>
          <Text style={styles.navigationButton}>sign out</Text>
        </TouchableHighlight>

        <View style={{flex: 2}}/>
      </View>
    );
  }
}