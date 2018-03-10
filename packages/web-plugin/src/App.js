import React, { Component } from 'react';
import NewUserComponent from "./pages/newuserwelcome/NewUserWelcomeComponent";
import { MemoryRouter as Router, Route } from 'react-router-dom'
import CreateAccountComponent from "./pages/CreateAccountComponent";
import ImportAccountComponent from "./pages/ImportAccountComponent";
import "./App.scss";

class App extends Component {
  render() {
    return (

        <Router>
          <div>
            <Route exact={true} path="/" component={NewUserComponent} />
            <Route path="/createAccount" component={CreateAccountComponent} />
            <Route path="/importAccount" component={ImportAccountComponent} />
          </div>
        </Router>
    );
  }
}

export default App;
