import React, { Component } from 'react';
import { Link } from "react-router-dom";

class NewUserWelcomeComponent extends Component {

  render() {

    return (

      <div className="NewUserWelcome container">

        <img alt="" className="NewUserWelcome logo" src={require("../../images/kudos.png")}/>
        <h5 className="NewUserWelcome welcomeMessage">Welcome to Kudos</h5>

        <Link to="/createAccount">
          <button className="NewUserWelcome createAccountButton">Start a new account</button>
        </Link>

        <Link to="/importAccount">
          <button className="NewUserWelcome importAccountButton">I already have an account</button>
        </Link>

        <h6 className="NewUserWelcome version">K U D O S - v 1 . 0</h6>

      </div>
    );
  }
}

export default NewUserWelcomeComponent;
