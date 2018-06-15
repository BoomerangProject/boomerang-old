import navigatorStyle from './NavigatorStyle';
import { ToastAndroid } from 'react-native';
import IsUserRequester from '../api/read/IsUserRequester';
import IsWorkerRequester from '../api/read/IsWorkerRequester';
import IsBusinessRequester from '../api/read/IsBusinessRequester';
import { getItem, setItem } from '../services/LocalStorageService';


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

  resetToUserAccountPage() {
    this.resetToPage({screenName: 'UserAccountPage'});
  }

  resetToWorkerAccountPage() {
    this.resetToPage({screenName: 'WorkerAccountPage'});
  }

  resetToBusinessAccountPage() {
    this.resetToPage({screenName: 'BusinessAccountPage'});
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

  pushAddEmployeePage() {
    this.pushPage({screenName: 'AddEmployeePage'});
  }

  resetToWelcomePage() {
    this.resetToPage({screenName: 'WelcomePage', navBarHidden: true});
  }

  pushTransactionsPage() {
    this.pushPage({screenName: 'TransactionsPage', backButton: true});
  }

  pushAccountTypeSelectionPage() {
    this.pushPage({screenName: 'AccountTypeSelectionPage', navBarHidden: true});
  }

  goBack() {
    this.navigator.pop();
  }

  async goToAccountPage(kudosAccountAddress) {

    const isUserRequester = new IsUserRequester(kudosAccountAddress);
    const isWorkerRequester = new IsWorkerRequester(kudosAccountAddress);
    const isBusinessRequester = new IsBusinessRequester(kudosAccountAddress);

    const isUser = await isUserRequester.makeRequest();
    const isWorker = await isWorkerRequester.makeRequest();
    const isBusiness = await isBusinessRequester.makeRequest();

    ToastAndroid.show(isUser.toString() + '\n' + isWorker.toString() + '\n' + isBusiness.toString(), ToastAndroid.SHORT);

    if ((isUser && isWorker) || (isWorker && isBusiness) || (isUser && isBusiness)) {
      this.pushAccountTypeSelectionPage();
      return;
    }

    if (isUser) {

      await setItem('userRole', 'user');
      const userRoleValue = await getItem('userRole');
      console.log('userRoleValue: ' + userRoleValue.toString());
      this.resetToUserAccountPage();

    } else if (isWorker) {

      await setItem('userRole', 'worker');
      const userRoleValue = await getItem('userRole');
      console.log('userRoleValue: ' + userRoleValue.toString());
      this.resetToWorkerAccountPage();

    } else if (isBusiness) {

      await setItem('userRole', 'business');
      const userRoleValue = await getItem('userRole');
      console.log('userRoleValue: ' + userRoleValue.toString());
      this.resetToBusinessAccountPage();
      // Navigator.init(this).resetToBusinessEmployeesPage();

    } else {
      ToastAndroid.show('account not found!', ToastAndroid.SHORT);
    }
  }


  pushPage(arg) {

    const paramsObject = this.getParamsObject(arg);
    this.navigator.push(paramsObject);
  }

  resetToPage(arg) {
    const paramsObject = this.getParamsObject(arg);
    this.navigator.resetTo(paramsObject);
  }

  getParamsObject({screenName, title, props, navBarHidden = false, backButton = false} = {}) {

    // console.log('screenName: ' + screenName);
    // console.log('title: ' + title);
    // console.log('props: ' + JSON.stringify(props));
    // console.log('navBarHidden: ' + navBarHidden);
    // console.log('backButton: ' + backButton);

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