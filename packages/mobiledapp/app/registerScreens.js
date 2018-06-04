import { Navigation } from 'react-native-navigation';
import WelcomeComponent from "./pages/newuser/welcome/WelcomeComponent";
import CreateAccountComponent from "./pages/newuser/createaccount/CreateAccountComponent";
import ImportAccountComponent from "./pages/newuser/importaccount/ImportAccountComponent";
import AccountComponent from "./pages/old/account/AccountComponent";
import UserAccountComponent from "./pages/accounts/user/UserAccountComponent";
import WorkerAccountComponent from "./pages/accounts/worker/WorkerAccountComponent";
import BusinessAccountComponent from "./pages/accounts/business/businessaccount/BusinessAccountComponent";
import AccountTypeSelectionComponent from "./pages/newuser/accounttypeselection/AccountTypeSelectionComponent";
import CreateBusinessAccountComponent from "./pages/newuser/createbusinessaccount/CreateBusinessAccountComponent";
import AddProfilePhotoComponent from "./pages/newuser/addprofilephoto/AddProfilePhotoComponent";
import LoadingPageComponent from "./pages/loadingpage/LoadingPageComponent";
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
import AddEmployeeComponent from "./pages/accounts/business/addemployee/AddEmployeeComponent";

export function registerScreens() {

  Navigation.registerComponent('WelcomePage', () => WelcomeComponent);
  Navigation.registerComponent('CreateAccountPage', () => CreateAccountComponent);
  Navigation.registerComponent('ImportAccountPage', () => ImportAccountComponent);
  Navigation.registerComponent('AccountPage', () => AccountComponent);
  Navigation.registerComponent('UserAccountPage', () => UserAccountComponent);
  Navigation.registerComponent('WorkerAccountPage', () => WorkerAccountComponent);
  Navigation.registerComponent('BusinessAccountPage', () => BusinessAccountComponent);
  Navigation.registerComponent('AccountTypeSelectionPage', () => AccountTypeSelectionComponent);
  Navigation.registerComponent('CreateBusinessAccountPage', () => CreateBusinessAccountComponent);
  Navigation.registerComponent('BusinessEmployeesPage', () => BusinessEmployeesComponent);
  Navigation.registerComponent('AddProfilePhotoPage', () => AddProfilePhotoComponent);
  Navigation.registerComponent('LoadingPage', () => LoadingPageComponent);
  Navigation.registerComponent('NavigationDrawerComponent', () => NavigationDrawerComponent);
  Navigation.registerComponent('UserProfilePage', () => UserProfileComponent);
  Navigation.registerComponent('WorkerProfilePage', () => WorkerProfileComponent);
  Navigation.registerComponent('BusinessProfilePage', () => BusinessProfileComponent);

  Navigation.registerComponent('ReviewListComponent', () => ReviewListComponent);
  Navigation.registerComponent('ReviewListItemComponent', () => ReviewListItemComponent);

  Navigation.registerComponent('BusinessListComponent', () => BusinessListComponent);
  Navigation.registerComponent('BusinessListItemComponent', () => BusinessListItemComponent);
  Navigation.registerComponent('BalancePage', () => BalanceComponent);

  Navigation.registerComponent('ReviewPage', () => ReviewComponent);
  Navigation.registerComponent('TransactionLoadingButtonComponent', () => TransactionLoadingButtonComponent);
  Navigation.registerComponent('TransactionsPage', () => TransactionsComponent);
  Navigation.registerComponent('AddEmployeePage', () => AddEmployeeComponent);
}