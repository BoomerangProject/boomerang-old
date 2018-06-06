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

  transactionsButton() {

    return [
      {
        id: 'transactions',
        component: 'TransactionLoadingButtonComponent',
        passProps: {
          navigator: this.navigator,
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
    this.goToPageWithoutNavbar('AddEmployeePage');
  }

  goToAddEmployeeLoadingPage() {
    this.goToPageWithoutNavbar('AddEmployeeLoadingPage');
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
      rightButtons: this.transactionsButton(),
      screen: screenName,
      navigatorStyle,
      passProps: props
    });
  }

  resetToPage(screenName, title, props) {
    this.navigator.resetTo({
      title,
      leftButtons: this.hamburgerButton(),
      rightButtons: this.transactionsButton(),
      screen: screenName,
      navigatorStyle,
      passProps: props
    });
  }
}