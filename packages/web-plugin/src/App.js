import React, { Component } from 'react';
import NewUserComponent from "./pages/NewUserComponent";
import { MemoryRouter as Router, Route } from 'react-router-dom'
import CreateAccountComponent from "./pages/CreateAccountComponent";
import ImportAccountComponent from "./pages/ImportAccountComponent";

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
