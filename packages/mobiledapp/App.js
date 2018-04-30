import './shim.js'
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import NewUserComponent from "./app/pages/newuser/NewUserComponent";
import CreateAccountComponent from "./app/pages/createaccount/CreateAccountComponent";
import ImportAccountComponent from "./app/pages/importaccount/ImportAccountComponent";
import AccountComponent from "./app/pages/account/AccountComponent";
import ReviewComponent from "./app/pages/review/ReviewComponent";

const RootStack = StackNavigator(
  {
    NewUserComponent: {
      screen: NewUserComponent,
    },
    CreateAccountComponent: {
      screen: CreateAccountComponent,
    },
    ImportAccountComponent: {
      screen: ImportAccountComponent,
    },
    AccountComponent: {
      screen: AccountComponent,
    },
    ReviewComponent: {
      screen: ReviewComponent,
    }
  },
  {
    initialRouteName: 'NewUserComponent'
  }
);

class App extends Component {

  render() {
    return <RootStack />;
  }
}

export default App;