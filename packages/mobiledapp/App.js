import './shim.js'

import { Navigation } from 'react-native-navigation';
import { registerScreens } from "./app/registerScreens";
import BusinessAccountComponent from "./app/pages/accounts/business/businessaccount/BusinessAccountComponent";
import BusinessEmployeesComponent from "./app/pages/accounts/business/businessemployees/BusinessEmployeesComponent";

export function start() {
  registerScreens();

  const navigatorStyle = {
    navBarTextColor: '#002A1C',
    navBarTextFontSize: 22,
    navBarTextFontFamily: 'WorkSans-Regular',
    navBarButtonColor: '#002A1C'
  };

  const startingScreen = 'NewUserComponent';
  // const startingScreen = 'BusinessAccountComponent';
  // const startingScreen = 'BusinessEmployeesComponent';

  Navigation.startSingleScreenApp({
    screen: {
      screen: startingScreen,
      title: 'kudos',
      navigatorStyle,
      leftButtons: [
        {
          id: 'sideMenu'
        }
      ]
    },
    drawer: {
      left: {
        screen: 'NavigationDrawerComponent'
      }
    }
  });
}