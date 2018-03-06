import React, { Component } from 'react';
import LoginComponent from "./pages/LoginComponent";
import { MemoryRouter as Router, Route } from 'react-router-dom'
import CreateAccountComponent from "./pages/CreateAccountComponent";
import ImportAccountComponent from "./pages/ImportAccountComponent";

class App extends Component {
  render() {
    return (

        <Router>
          <div>
            <Route exact={true} path="/" component={LoginComponent} />
            <Route path="/createAccount" component={CreateAccountComponent} />
            <Route path="/importAccount" component={ImportAccountComponent} />
          </div>
        </Router>
    );
  }
}

export default App;
