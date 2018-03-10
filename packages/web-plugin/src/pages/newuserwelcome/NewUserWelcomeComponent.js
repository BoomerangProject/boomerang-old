import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class NewUserWelcomeComponent extends Component {


  onClickOfButton() {
    console.log(window.document);
  }

  render() {

    return (

      <div className="NewUserWelcome container">

        <img alt="" className="NewUserWelcome logo" src={require("../../images/kudos.png")}/>
        <h5 className="NewUserWelcome welcomeMessage">Welcome to Kudos</h5>

        <div>
          <Link to="/createAccount">
            <button className="NewUserWelcome createAccountButton" onClick={this.onClickOfButton.bind(this)}>Start a new
              account</button>
          </Link>
          <br/>
          <Link to="/importAccount">
            <button className="NewUserWelcome importAccountButton">I already have an account</button>
          </Link>
        </div>

        <h6 className="NewUserWelcome version">K U D O S - v 1 . 0</h6>

      </div>
    );
  }
}

export default NewUserWelcomeComponent;
