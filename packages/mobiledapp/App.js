import './shim.js'

import { Navigation } from 'react-native-navigation';
import { registerScreens } from "./app/registerScreens";
import DefineRewardsTestComponent from "./app/pages/test/definerewardstest/DefineRewardsTestComponent";

export function start() {
  registerScreens();

  const startingScreen = 'SplashScreenPage';
  // const startingScreen = 'DefinePerformanceRewardsPage';
  // const startingScreen = 'DefineRewardsTestPage';
  // const startingScreen = 'WelcomePage';
  // const startingScreen = 'BusinessAccountPage';
  // const startingScreen = 'BusinessEmployeesPage';

  Navigation.startSingleScreenApp({
    screen: {
      screen: startingScreen,
      title: 'boomerang',
      navigatorStyle: {
        navBarHidden: true
      }
    },
    drawer: {
      left: {
        screen: 'NavigationDrawerComponent'
      }
    }
  });
}