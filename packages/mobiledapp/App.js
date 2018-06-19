import './shim.js'

import { Navigation } from 'react-native-navigation';
import { registerScreens } from "./app/registerScreens";

export function start() {
  registerScreens();

  // const startingScreen = 'SplashScreenPage';
  const startingScreen = 'DefinePerformanceRewardsPage';
  // const startingScreen = 'WelcomePage';
  // const startingScreen = 'BusinessAccountPage';
  // const startingScreen = 'BusinessEmployeesPage';

  Navigation.startSingleScreenApp({
    screen: {
      screen: startingScreen,
      title: 'kudos',
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