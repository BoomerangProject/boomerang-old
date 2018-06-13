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

  goToCreateAccountPage() {
    this.goToPageWithoutNavbar('CreateAccountPage');
  }

  goToImportAccountPage() {
    this.goToPageWithoutNavbar('ImportAccountPage');
  }

  goToAccountTypeSelectionPage() {
    this.goToPageWithoutNavbar('AccountTypeSelectionPage');
  }

  goToCreateBusinessAccountPage() {
    this.goToPageWithoutNavbar('CreateBusinessAccountPage');
  }

  goToLoadingPage(props) {
    this.goToPageWithoutNavbar('LoadingPage', props);
  }

   goToBusinessEmployeesPage(props) {
    this.goToPage('BusinessEmployeesPage', 'employees', props);
  }

  resetToBusinessEmployeesPage(props) {
    this.resetToPage('BusinessEmployeesPage', 'employees', props);
  }

  goToAddEmployeePage() {
    this.goToPage('AddEmployeePage');
  }

  goToWelcomePage() {
    this.goToPageWithoutNavbar('WelcomePage');
  }

  goToTransactionsPage() {
    this.goToPageWithBackButton('TransactionsPage');
  }

  goBack() {
    this.navigator.pop();
  }

  goToPageWithoutNavbar(screenName, props) {
    this.navigator.push({
      screen: screenName,
      navigatorStyle: {
        navBarHidden: true
      },
      passProps: props
    });
  }

  goToPage(screenName, title, props) {
    this.navigator.push({
      title,
      leftButtons: this.hamburgerButton(),
      rightButtons: this.transactionsButton(screenName),
      screen: screenName,
      navigatorStyle,
      passProps: props
    });
  }

  goToPageWithBackButton(screenName, title, props) {
    this.navigator.push({
      title,
      rightButtons: this.transactionsButton(screenName),
      screen: screenName,
      navigatorStyle,
      passProps: props
    });
  }

  resetToPage(screenName, title, props) {
    this.navigator.resetTo({
      title,
      leftButtons: this.hamburgerButton(),
      rightButtons: this.transactionsButton(screenName),
      screen: screenName,
      navigatorStyle,
      passProps: props
    });
  }
}