import { Navigation } from 'react-native-navigation';
import WelcomeComponent from './pages/newuser/welcome/WelcomeComponent';
import CreateAccountComponent from './pages/newuser/createaccount/CreateAccountComponent';
import ImportAccountComponent from './pages/newuser/importaccount/ImportAccountComponent';
import UserHomePageComponent from './pages/accounts/user/userhomepage/UserHomePageComponent';
import WorkerHomePageComponent from './pages/accounts/worker/workerhomepage/WorkerHomePageComponent';
import BusinessHomePageComponent from './pages/accounts/business/businesshomepage/BusinessHomePageComponent';
import AccountTypeSelectionComponent from './pages/newuser/accounttypeselection/AccountTypeSelectionComponent';
import CreateUserAccountComponent from './pages/newuser/createuseraccount/CreateUserAccountComponent';
import CreateWorkerAccountComponent from './pages/newuser/createworkeraccount/CreateWorkerAccountComponent';
import CreateBusinessAccountComponent from './pages/newuser/createbusinessaccount/CreateBusinessAccountComponent';
import AddProfilePhotoComponent from './pages/newuser/addprofilephoto/AddProfilePhotoComponent';
import LoadingPageComponent from './pages/loadingpage/LoadingPageComponent';
import NavigationDrawerComponent from './views/navigationdrawer/NavigationDrawerComponent';
import BusinessListComponent from './views/businessdirectory/BusinessList/BusinessListComponent';
import BusinessListItemComponent from './views/businessdirectory/BusinessListItem/BusinessListItemComponent';
import BalanceComponent from './views/balance/BalanceComponent';
import BusinessEmployeesComponent from './pages/accounts/business/businessemployees/BusinessEmployeesComponent';
import WorkerEmployersComponent from './pages/accounts/worker/workeremployers/WorkerEmployersComponent';
import UserProfileComponent from './pages/profiles/user/UserProfileComponent';
import WorkerProfileComponent from './pages/profiles/worker/WorkerProfileComponent';
import BusinessProfileComponent from './pages/profiles/business/BusinessProfileComponent';
import ReviewListComponent from './views/reviewfeed/ReviewList/ReviewListComponent';
import ReviewListItemComponent from './views/reviewfeed/ReviewListItem/ReviewListItemComponent';
import ReviewComponent from './pages/review/ReviewComponent'
import TransactionLoadingButtonComponent from './views/transactionloadingbutton/TransactionLoadingButtonComponent';
import TransactionsComponent from './pages/transactions/TransactionsComponent';
import AddEmployeeComponent from './pages/accounts/business/addemployee/AddEmployeeComponent';
import SplashScreenComponent from './pages/splashscreen/SplashScreenComponent';
import BusinessAnalyticsComponent from "./pages/accounts/business/businessanalytics/BusinessAnalyticsComponent";
import WorkerRewardsComponent from "./pages/accounts/worker/workerrewards/WorkerRewardsComponent";
import UserRewardsComponent from "./pages/accounts/user/userrewards/UserRewardsComponent";
import DefineWorkerRewardCirclesComponent from "./pages/accounts/business/defineworkerrewards/a/DefineWorkerRewardCirclesComponent";
import DefineWorkerRewardLevelsComponent from "./pages/accounts/business/defineworkerrewards/b/DefineWorkerRewardLevelsComponent";
import DefineWorkerRewardRatingDistributionComponent from "./pages/accounts/business/defineworkerrewards/c/DefineWorkerRewardRatingDistributionComponent";
import DefineWorkerRewardColorSchemeComponent from "./pages/accounts/business/defineworkerrewards/d/DefineWorkerRewardColorSchemeComponent";
import DefineUserRewardsComponent from "./pages/accounts/business/defineuserrewards/DefineUserRewardsComponent";
import DefineRewardsTestComponent from "./pages/test/definerewardstest/DefineRewardsTestComponent";

export function registerScreens() {

  Navigation.registerComponent('WelcomePage', () => WelcomeComponent);
  Navigation.registerComponent('CreateAccountPage', () => CreateAccountComponent);
  Navigation.registerComponent('ImportAccountPage', () => ImportAccountComponent);
  Navigation.registerComponent('UserHomePage', () => UserHomePageComponent);
  Navigation.registerComponent('WorkerHomePage', () => WorkerHomePageComponent);
  Navigation.registerComponent('BusinessHomePage', () => BusinessHomePageComponent);
  Navigation.registerComponent('AccountTypeSelectionPage', () => AccountTypeSelectionComponent);
  Navigation.registerComponent('CreateUserAccountPage', () => CreateUserAccountComponent);
  Navigation.registerComponent('CreateWorkerAccountPage', () => CreateWorkerAccountComponent);
  Navigation.registerComponent('CreateBusinessAccountPage', () => CreateBusinessAccountComponent);
  Navigation.registerComponent('BusinessEmployeesPage', () => BusinessEmployeesComponent);
  Navigation.registerComponent('WorkerEmployersPage', () => WorkerEmployersComponent);
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
  Navigation.registerComponent('BalanceComponent', () => BalanceComponent);

  Navigation.registerComponent('ReviewPage', () => ReviewComponent);
  Navigation.registerComponent('TransactionLoadingButtonComponent', () => TransactionLoadingButtonComponent);
  Navigation.registerComponent('TransactionsPage', () => TransactionsComponent);
  Navigation.registerComponent('AddEmployeePage', () => AddEmployeeComponent);
  Navigation.registerComponent('SplashScreenPage', () => SplashScreenComponent);

  Navigation.registerComponent('BusinessAnalyticsPage', () => BusinessAnalyticsComponent);
  Navigation.registerComponent('WorkerRewardsPage', () => WorkerRewardsComponent);
  Navigation.registerComponent('UserRewardsPage', () => UserRewardsComponent);
  Navigation.registerComponent('DefineUserRewardsPage', () => DefineUserRewardsComponent);
  Navigation.registerComponent('DefineWorkerRewardCirclesPage', () => DefineWorkerRewardCirclesComponent);
  Navigation.registerComponent('DefineWorkerRewardLevelsPage', () => DefineWorkerRewardLevelsComponent);
  Navigation.registerComponent('DefineRewardsTestPage', () => DefineRewardsTestComponent);
  Navigation.registerComponent('DefineWorkerRewardRatingDistributionPage', () => DefineWorkerRewardRatingDistributionComponent);
  Navigation.registerComponent('DefineWorkerRewardColorSchemePage', () => DefineWorkerRewardColorSchemeComponent);
}