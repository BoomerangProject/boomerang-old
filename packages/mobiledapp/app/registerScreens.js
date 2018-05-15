import { Navigation } from 'react-native-navigation';
import NewUserComponent from "./pages/newuser/NewUserComponent";
import CreateAccountComponent from "./pages/createaccount/CreateAccountComponent";
import ImportAccountComponent from "./pages/importaccount/ImportAccountComponent";
import AccountComponent from "./pages/account/AccountComponent";
import UserAccountComponent from "./pages/useraccount/UserAccountComponent";
import WorkerAccountComponent from "./pages/workeraccount/WorkerAccountComponent";
import BusinessAccountComponent from "./pages/businessaccount/BusinessAccountComponent";
import LoadingPageComponent from "./pages/loadingpage/LoadingPageComponent";
import AccountTypeSelectionComponent from "./pages/accounttypeselection/AccountTypeSelectionComponent";
import CreateBusinessAccountComponent from "./pages/createbusinessaccount/CreateBusinessAccountComponent";
import AddProfilePhotoComponent from "./pages/addprofilephoto/AddProfilePhotoComponent";
import CreateBusinessAccountLoadingPageComponent from "./pages/createbusinessaccountloadingpage/CreateBusinessAccountLoadingPageComponent";

export function registerScreens() {

  Navigation.registerComponent('NewUserComponent', () => NewUserComponent);
  Navigation.registerComponent('CreateAccountComponent', () => CreateAccountComponent);
  Navigation.registerComponent('ImportAccountComponent', () => ImportAccountComponent);
  Navigation.registerComponent('AccountComponent', () => AccountComponent);
  Navigation.registerComponent('UserAccountComponent', () => UserAccountComponent);
  Navigation.registerComponent('WorkerAccountComponent', () => WorkerAccountComponent);
  Navigation.registerComponent('BusinessAccountComponent', () => BusinessAccountComponent);
  Navigation.registerComponent('LoadingPageComponent', () => LoadingPageComponent);
  Navigation.registerComponent('AccountTypeSelectionComponent', () => AccountTypeSelectionComponent);
  Navigation.registerComponent('CreateBusinessAccountComponent', () => CreateBusinessAccountComponent);
  Navigation.registerComponent('AddProfilePhotoComponent', () => AddProfilePhotoComponent);
  Navigation.registerComponent('CreateBusinessAccountLoadingPageComponent', () => CreateBusinessAccountLoadingPageComponent);
}