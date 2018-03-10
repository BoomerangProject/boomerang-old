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

        <br/>
        {/*<h4 style={{marginTop: 0, lineHeight: 1.4, fontStyle: "normal", fontSize: "1.6em", fontWeight: 600, fontFamily: "Work Sans, sans-serif"}}>Our public sale is no longer on January 16th, 2018. We are excited to announce a partnership for our sale coming soon. Stay tuned!</h4>*/}

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

        <h6 className="NewUserWelcome version">KUDOS v1.0</h6>

      </div>
    );
  }
}

export default NewUserWelcomeComponent;
