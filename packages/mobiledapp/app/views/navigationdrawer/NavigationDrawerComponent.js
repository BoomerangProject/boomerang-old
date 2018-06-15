import React, { Component } from 'react';
import styles from './NavigationDrawerComponentStyle';
import { Image, Text, View, TouchableHighlight, ToastAndroid } from 'react-native';
import Navigator from '../../util/Navigator';
import { getItem, clearSeed } from '../../services/LocalStorageService';

export default class NavigationDrawerComponent extends Component {

  constructor(args) {
    super(args);
    this.state = {userRole: ''};
  }

  async componentDidMount() {
    const userRole = await getItem('userRole');

    console.log('USERORLE: ' + userRole);

    this.setState({userRole});
  }

  onClickOfEmployeesButton() {
    Navigator.init(this).pushBusinessEmployeesPage();
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

  onClickOfTransactionsButton() {
    Navigator.init(this).pushTransactionsPage();
    this.closeDrawer();
  }

  async onClickOfSignOutButton() {

    await clearSeed();
    Navigator.init(this).resetToWelcomePage();
    this.closeDrawer();
  }

  closeDrawer() {
    this.props.navigator.toggleDrawer({side: 'left', to: 'closed'});
  }

  render() {

    return (

      <View style={styles.container}>

        <Image style={styles.logo} source={require('../../../assets/images/kudos.png')}/>

        <View style={{flex: 1}}/>

        <View style={styles.divider}/>

        {this.state.userRole === 'business' &&

          <TouchableHighlight
            underlayColor='#FAFAFA'
            style={styles.employeesButtonContainer}
            onPress={this.onClickOfEmployeesButton.bind(this)}>
            <Text style={styles.employeesButton}>employees</Text>
          </TouchableHighlight>
        }


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
          style={styles.transactionsButtonContainer}
          onPress={this.onClickOfTransactionsButton.bind(this)}>
          <Text style={styles.transactionsButton}>transactions</Text>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor='#FAFAFA'
          style={styles.signOutButtonContainer}
          onPress={this.onClickOfSignOutButton.bind(this)}>
          <Text style={styles.signOutButton}>sign out</Text>
        </TouchableHighlight>

        <View style={{flex: 1}}/>
      </View>
    );
  }
}