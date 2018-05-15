import './shim.js'

import { Navigation } from 'react-native-navigation';
import { registerScreens } from "./app/registerScreens";
import BusinessAccountComponent from "./app/pages/businessaccount/BusinessAccountComponent";

export function start() {
  registerScreens();

  Navigation.startSingleScreenApp({
    screen: {
      screen: 'NewUserComponent',
      title: 'Welcome', // title of the screen as appears in the nav bar (optional)
      navigatorStyle: {
        navBarHidden: true
      }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
      navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
    }
  });
}