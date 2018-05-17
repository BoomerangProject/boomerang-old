import { Navigation } from 'react-native-navigation';
import NewUserComponent from "./pages/newuser/welcome/WelcomeComponent";
import CreateAccountComponent from "./pages/newuser/createaccount/CreateAccountComponent";
import ImportAccountComponent from "./pages/newuser/importaccount/ImportAccountComponent";
import AccountComponent from "./pages/old/account/AccountComponent";
import UserAccountComponent from "./pages/useraccount/UserAccountComponent";
import WorkerAccountComponent from "./pages/workeraccount/WorkerAccountComponent";
import BusinessAccountComponent from "./pages/business/businessaccount/BusinessAccountComponent";
import LoadingPageComponent from "./pages/loadingpage/LoadingPageComponent";
import AccountTypeSelectionComponent from "./pages/newuser/accounttypeselection/AccountTypeSelectionComponent";
import CreateBusinessAccountComponent from "./pages/business/createbusinessaccount/CreateBusinessAccountComponent";
import AddProfilePhotoComponent from "./pages/newuser/addprofilephoto/AddProfilePhotoComponent";
import CreateBusinessAccountLoadingPageComponent from "./pages/business/createbusinessaccountloadingpage/CreateBusinessAccountLoadingPageComponent";
import NavigationDrawerComponent from "./views/navigationdrawer/NavigationDrawerComponent";
import ReviewsComponent from "./views/reviews/ReviewsComponent";
import BalanceComponent from "./views/balance/BalanceComponent";

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
  Navigation.registerComponent('NavigationDrawerComponent', () => NavigationDrawerComponent);

  Navigation.registerComponent('ReviewsComponent', () => ReviewsComponent);
  Navigation.registerComponent('BalanceComponent', () => BalanceComponent);
}