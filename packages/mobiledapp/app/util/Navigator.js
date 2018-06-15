import navigatorStyle from './NavigatorStyle';

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

  resetToAccountTypeSelectionPage() {
    this.resetToPage({screenName: 'AccountTypeSelectionPage', navBarHidden: true});
  }

  goBack() {
    this.navigator.pop();
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