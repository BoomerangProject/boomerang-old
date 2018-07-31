import React, { Component } from 'react';
import NewUserComponent from "./pages/newuser/NewUserComponent";
import { MemoryRouter as Router, Route } from 'react-router-dom'
import CreateAccountComponent from "./pages/createaccount/CreateAccountComponent";
import ImportAccountComponent from "./pages/importaccount/ImportAccountComponent";
import "./App.scss";
import AccountComponent from "./pages/account/AccountComponent";
import RatingWidgetComponent from "./pages/ratingwidget/RatingWidgetComponent";
import RatingModalComponent from "./pages/ratingmodal/RatingModalComponent";
import RatingModalContainerComponent from "./pages/ratingmodal/RatingModalContainerComponent";

class App extends Component {

  constructor(props) {
    super(props);
  }

  // startingComponent() {
  //
  //   const boomerangAccountSeed = localStorage.getItem("boomerangAccountSeed");
  //
  //   if (boomerangAccountSeed !== null && boomerangAccountSeed.length === 64) {
  //     return AccountComponent;
  //   } else {
  //     return NewUserComponent;
  //   }
  // }

  render() {

    return (

      <Router>
        <div>
          <Route path="/" exact={true} component={() => (<NewUserComponent {...this.props} />)} />
          <Route path="/ratingModalContainer" component={() => (<RatingModalContainerComponent {...this.props} />)}/>
          <Route path="/createAccount" component={CreateAccountComponent}/>
          <Route path="/importAccount" component={ImportAccountComponent}/>
          <Route path="/account" component={AccountComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;
