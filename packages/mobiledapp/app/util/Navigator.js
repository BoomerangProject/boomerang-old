import navigatorStyle from './NavigatorStyle';
import { ToastAndroid } from 'react-native';
import IsUserRequester from '../api/read/IsUserRequester';
import IsWorkerRequester from '../api/read/IsWorkerRequester';
import IsBusinessRequester from '../api/read/IsBusinessRequester';
import { getItem, logOut, setItem } from '../services/LocalStorageService';
import { Navigation } from "react-native-navigation";


export default class Navigator {

  static init(instance) {
    return new NavigatorImpl(instance.props.navigator);
  }
}

class NavigatorImpl {

  constructor(navigatorArg) {
    this.navigator = navigatorArg;
  }

  hamburgerButton() {
    return [{id: 'sideMenu'}];
  }

  transactionsButton(screenName) {

    return [
      {
        id: 'transactions',
        component: 'TransactionLoadingButtonComponent',
        passProps: {
          navigator: this.navigator,
          screenName: screenName
        }
      }
    ];
  }

  startNewAppToUserHomePage() {
    this.startNewApp({screenName: 'UserHomePage'}, 'user');
  }

  startNewAppToWorkerHomePage() {
    this.startNewApp({screenName: 'WorkerHomePage'}, 'worker');
  }

  startNewAppToBusinessHomePage() {
    this.startNewApp({screenName: 'BusinessHomePage'}, 'business');
  }

  pushCreateAccountPage() {
    this.pushPage({screenName: 'CreateAccountPage', navBarHidden: true});
  }

  pushImportAccountPage() {
    this.pushPage({screenName: 'ImportAccountPage', navBarHidden: true});
  }

  pushAccountTypeSelectionPage() {
    this.pushPage({screenName: 'AccountTypeSelectionPage', navBarHidden: true});
  }

  pushCreateUserAccountPage() {
    this.pushPage({screenName: 'CreateUserAccountPage', navBarHidden: true});
  }

  pushCreateWorkerAccountPage() {
    this.pushPage({screenName: 'CreateWorkerAccountPage', navBarHidden: true});
  }

  pushCreateBusinessAccountPage() {
    this.pushPage({screenName: 'CreateBusinessAccountPage', navBarHidden: true});
  }

  pushLoadingPage(props) {
    this.pushPage({screenName: 'LoadingPage', navBarHidden: true, props: props});
  }

  pushBusinessEmployeesPage(props) {
    this.pushPage({screenName: 'BusinessEmployeesPage', title: 'employees', props: props});
  }

  resetToBusinessEmployeesPage(props) {
    this.resetToPage({screenName: 'BusinessEmployeesPage', title: 'employees', props: props});
  }

  pushWorkerEmployersPage(props) {
    this.pushPage({screenName: 'WorkerEmployersPage', title: 'employers', props: props});
  }

  pushBusinessAnalyticsPage(props) {
    this.pushPage({screenName: 'BusinessAnalyticsPage', title: 'business analytics', props: props});
  }

  pushDefineWorkerRewardCirclesPage(props) {
    this.pushPage({screenName: 'DefineWorkerRewardCirclesPage', title: 'reward structure', props: props});
  }

  pushDefineWorkerRewardLevelsPage(props) {
    this.pushPage({screenName: 'DefineWorkerRewardLevelsPage', title: 'reward levels', props: props});
  }

  pushDefineWorkerRewardRatingDistributionComponent(props) {
    this.pushPage({screenName: 'DefineWorkerRewardRatingDistributionPage', title: 'rating distribution', props: props});
  }

  pushDefineWorkerRewardRatingColorSchemeComponent(props) {
    this.pushPage({screenName: 'DefineWorkerRewardColorSchemePage', title: 'color scheme', props: props});
  }

  pushDefineUserRewardsPage(props) {
    this.pushPage({screenName: 'DefineUserRewardsPage', title: 'customer rewards', props: props});
  }

  pushWorkerRewardsPage(props) {
    this.pushPage({screenName: 'WorkerRewardsPage', title: 'employee rewards', props: props});
  }

  pushUserRewardsPage(props) {
    this.pushPage({screenName: 'UserRewardsPage', title: 'customer rewards', props: props});
  }

  pushAddEmployeePage() {
    this.pushPage({screenName: 'AddEmployeePage'});
  }

  resetToWelcomePage() {
    this.resetToPage({screenName: 'WelcomePage', navBarHidden: true});
  }

  pushTransactionsPage() {
    this.pushPage({screenName: 'TransactionsPage', backButton: true});
  }

  pushUserRateExperiencePage() {
    this.pushPage({screenName: 'UserRateExperiencePage', navBarHidden: true});
  }

  goBack() {
    this.navigator.pop();
  }

  async goToAccountPage(boomerangAccountAddress) {

    const isUserRequester = new IsUserRequester(boomerangAccountAddress);
    const isWorkerRequester = new IsWorkerRequester(boomerangAccountAddress);
    const isBusinessRequester = new IsBusinessRequester(boomerangAccountAddress);

    const isUser = await isUserRequester.makeRequest();
    const isWorker = await isWorkerRequester.makeRequest();
    const isBusiness = await isBusinessRequester.makeRequest();

    ToastAndroid.show(isUser.toString() + '\n' + isWorker.toString() + '\n' + isBusiness.toString(), ToastAndroid.SHORT);

    if ((isUser && isWorker) || (isWorker && isBusiness) || (isUser && isBusiness)) {
      this.pushAccountTypeSelectionPage();
      return;
    }

    this.startNewAppToUserHomePage();

    // if (isUser) {
    //   this.startNewAppToUserHomePage();
    // } else if (isWorker) {
    //   this.startNewAppToWorkerHomePage();
    // } else if (isBusiness) {
    //   this.startNewAppToBusinessHomePage();
    //   // Navigator.init(this).resetToBusinessEmployeesPage();
    // } else {
    //   ToastAndroid.show('account not found!', ToastAndroid.SHORT);
    //   await logOut();
    //   this.resetToWelcomePage();
    // }
  }


  pushPage(arg) {
    const paramsObject = this.getParamsObject(arg);
    this.navigator.push(paramsObject);
  }

  resetToPage(arg) {
    const paramsObject = this.getParamsObject(arg);
    this.navigator.resetTo(paramsObject);
  }

  startNewApp(arg, userRole) {

    const paramsObject = this.getParamsObject(arg);

    Navigation.startSingleScreenApp({
      screen: paramsObject,
      drawer: {
        left: {
          screen: 'NavigationDrawerComponent',
          passProps: {userRole: userRole}
        }
      }
    });
  }

  getParamsObject({screenName, title, props, navBarHidden = false, backButton = false} = {}) {

    // console.log('screenName: ' + screenName);
    // console.log('title: ' + title);
    // console.log('props: ' + JSON.stringify(props));
    // console.log('navBarHidden: ' + navBarHidden);
    // console.log('backButton: ' + backButton);

    console.log(JSON.stringify(props));

    const paramsObject = {
      screen: screenName,
      title: title,
      passProps: props
    };

    if (navBarHidden) {
      paramsObject.navigatorStyle = {navBarHidden: true};
    } else {

      if (!backButton) {
        paramsObject.leftButtons = this.hamburgerButton();
      }

      paramsObject.rightButtons = this.transactionsButton(screenName);
      paramsObject.navigatorStyle = navigatorStyle;
    }

    return paramsObject;
  }
}