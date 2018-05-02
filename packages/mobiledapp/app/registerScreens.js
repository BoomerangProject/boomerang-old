import { Navigation } from 'react-native-navigation';
import NewUserComponent from "./pages/newuser/NewUserComponent";
import CreateAccountComponent from "./pages/createaccount/CreateAccountComponent";
import ImportAccountComponent from "./pages/importaccount/ImportAccountComponent";
import AccountComponent from "./pages/account/AccountComponent";
import UserAccountComponent from "./pages/useraccount/UserAccountComponent";
import WorkerAccountComponent from "./pages/workeraccount/WorkerAccountComponent";
import BusinessAccountComponent from "./pages/businessaccount/BusinessAccount";
import LoadingPageComponent from "./pages/loadingpage/LoadingPageComponent";

export function registerScreens() {

  Navigation.registerComponent('NewUserComponent', () => NewUserComponent);
  Navigation.registerComponent('CreateAccountComponent', () => CreateAccountComponent);
  Navigation.registerComponent('ImportAccountComponent', () => ImportAccountComponent);
  Navigation.registerComponent('AccountComponent', () => AccountComponent);
  Navigation.registerComponent('UserAccountComponent', () => UserAccountComponent);
  Navigation.registerComponent('WorkerAccountComponent', () => WorkerAccountComponent);
  Navigation.registerComponent('BusinessAccountComponent', () => BusinessAccountComponent);
  Navigation.registerComponent('LoadingPageComponent', () => LoadingPageComponent);
}