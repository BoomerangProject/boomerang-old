import { Navigation } from 'react-native-navigation';
import NewUserComponent from "./pages/newuser/NewUserComponent";
import CreateAccountComponent from "./pages/createaccount/CreateAccountComponent";
import ImportAccountComponent from "./pages/importaccount/ImportAccountComponent";
import AccountComponent from "./pages/account/AccountComponent";

export function registerScreens() {

  Navigation.registerComponent('NewUserComponent', () => NewUserComponent);
  Navigation.registerComponent('CreateAccountComponent', () => CreateAccountComponent);
  Navigation.registerComponent('ImportAccountComponent', () => ImportAccountComponent);
  Navigation.registerComponent('AccountComponent', () => AccountComponent);
}