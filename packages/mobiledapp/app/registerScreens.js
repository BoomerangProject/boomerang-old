import { Navigation } from 'react-native-navigation';
import NewUserComponent from "./pages/newuser/welcome/WelcomeComponent";
import CreateAccountComponent from "./pages/newuser/createaccount/CreateAccountComponent";
import ImportAccountComponent from "./pages/newuser/importaccount/ImportAccountComponent";
import AccountComponent from "./pages/old/account/AccountComponent";
import UserAccountComponent from "./pages/accounts/user/UserAccountComponent";
import WorkerAccountComponent from "./pages/accounts/worker/WorkerAccountComponent";
import BusinessAccountComponent from "./pages/accounts/business/businessaccount/BusinessAccountComponent";
import LoadingPageComponent from "./pages/loadingpage/LoadingPageComponent";
import AccountTypeSelectionComponent from "./pages/newuser/accounttypeselection/AccountTypeSelectionComponent";
import CreateBusinessAccountComponent from "./pages/accounts/business/createbusinessaccount/CreateBusinessAccountComponent";
import AddProfilePhotoComponent from "./pages/newuser/addprofilephoto/AddProfilePhotoComponent";
import CreateBusinessAccountLoadingPageComponent from "./pages/accounts/business/createbusinessaccountloadingpage/CreateBusinessAccountLoadingPageComponent";
import NavigationDrawerComponent from "./views/navigationdrawer/NavigationDrawerComponent";
import BusinessListComponent from "./views/businessdirectory/BusinessList/BusinessListComponent";
import BusinessListItemComponent from "./views/businessdirectory/BusinessListItem/BusinessListItemComponent";
import BalanceComponent from "./views/balance/BalanceComponent";
import BusinessEmployeesComponent from "./pages/accounts/business/businessemployees/BusinessEmployeesComponent";
import UserProfileComponent from "./pages/profiles/user/UserProfileComponent";
import WorkerProfileComponent from "./pages/profiles/worker/WorkerProfileComponent";
import BusinessProfileComponent from "./pages/profiles/business/BusinessProfileComponent";
import ReviewListComponent from "./views/reviewfeed/ReviewList/ReviewListComponent";
import ReviewListItemComponent from "./views/reviewfeed/ReviewListItem/ReviewListItemComponent";
import ReviewComponent from "./pages/review/ReviewComponent"
import TransactionLoadingButtonComponent from "./views/transactionloadingbutton/TransactionLoadingButtonComponent";
import TransactionsComponent from "./pages/transactions/TransactionsComponent";

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
  Navigation.registerComponent('BusinessEmployeesComponent', () => BusinessEmployeesComponent);
  Navigation.registerComponent('AddProfilePhotoComponent', () => AddProfilePhotoComponent);
  Navigation.registerComponent('CreateBusinessAccountLoadingPageComponent', () => CreateBusinessAccountLoadingPageComponent);
  Navigation.registerComponent('NavigationDrawerComponent', () => NavigationDrawerComponent);
  Navigation.registerComponent('UserProfileComponent', () => UserProfileComponent);
  Navigation.registerComponent('WorkerProfileComponent', () => WorkerProfileComponent);
  Navigation.registerComponent('BusinessProfileComponent', () => BusinessProfileComponent);

  Navigation.registerComponent('ReviewListComponent', () => ReviewListComponent);
  Navigation.registerComponent('ReviewListItemComponent', () => ReviewListItemComponent);

  Navigation.registerComponent('BusinessListComponent', () => BusinessListComponent);
  Navigation.registerComponent('BusinessListItemComponent', () => BusinessListItemComponent);
  Navigation.registerComponent('BalanceComponent', () => BalanceComponent);

  Navigation.registerComponent('ReviewComponent', () => ReviewComponent);
  Navigation.registerComponent('TransactionLoadingButtonComponent', () => TransactionLoadingButtonComponent);
  Navigation.registerComponent('TransactionsComponent', () => TransactionsComponent);
}