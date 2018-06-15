import React, { Component } from 'react';
import styles from './SplashScreenComponentStyle';
import { View, Image } from 'react-native';
import { isUserAccount, isWorkerAccount, isBusinessAccount, isLoggedIn } from '../../services/LocalStorageService';
import Navigator from '../../util/Navigator';

export default class SplashScreenComponent extends Component {

  constructor(args) {
    super(args);
  }

  async componentDidMount() {

    const userIsLoggedIn = await isLoggedIn();

    if (userIsLoggedIn) {

      const isUser = await isUserAccount();
      const isWorker = await isWorkerAccount();
      const isBusiness = await isBusinessAccount();

      if ( (isUser && isWorker) || (isWorker && isBusiness) || (isUser && isBusiness) ) {

        Navigator.init(this).resetToAccountTypeSelectionPage();
        return;
      }

      if (isUser) {

        Navigator.init(this).resetToUserAccountPage();

      } else if (isWorker) {

        Navigator.init(this).resetToWorkerAccountPage();

      } else if (isBusiness) {

        Navigator.init(this).resetToBusinessAccountPage();
        // Navigator.init(this).resetToBusinessEmployeesPage();
      }

    } else {
      Navigator.init(this).resetToWelcomePage();
    }
  }

  render() {

    return (

      <View style={styles.container}>

        <View style={{flex:1}}/>

        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../../../assets/images/kudos.png')}/>
        </View>

        <View style={{flex:1}}/>

      </View>
    );
  }
}