import React, { Component } from 'react';
import NewUserComponent from "./pages/newuser/NewUserComponent";
import { MemoryRouter as Router, Route } from 'react-router-dom'
import CreateAccountComponent from "./pages/createaccount/CreateAccountComponent";
import ImportAccountComponent from "./pages/importaccount/ImportAccountComponent";
import "./App.scss";
import AccountComponent from "./pages/account/AccountComponent";

class App extends Component {

  startingComponent() {

    const kudosAccountSeed = localStorage.getItem("kudosAccountSeed");

    if (kudosAccountSeed !== null && kudosAccountSeed.length === 64) {
      return AccountComponent;
    } else {
      return NewUserComponent;
    }
  }

  render() {

    return (

        <Router>
          <div>
            <Route exact={true} path="/" component={this.startingComponent()} />
            <Route path="/createAccount" component={CreateAccountComponent} />
            <Route path="/importAccount" component={ImportAccountComponent} />
            <Route path="/account" component={AccountComponent} />
          </div>
        </Router>
    );
  }
}

export default App;
