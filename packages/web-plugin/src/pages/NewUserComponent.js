import React, { Component } from 'react';
import { Link } from "react-router-dom";
import mainDivStyle from "../styles/MainDivStyle";
import { Button } from "react-bootstrap";

class NewUserComponent extends Component {

  render() {

    return (

      <div style={mainDivStyle}>

        <div style={{marginTop: "auto"}}>
          <img alt="" src={require("../images/kudos.png")} height="40px" width="40px"/>
        </div>

        <br/>
        <h4 style={{marginTop: 0, lineHeight: 1.4, fontStyle: "normal", fontSize: "1.6em", fontWeight: 600, fontFamily: "Work Sans, sans-serif"}}>Our public sale is no longer on January 16th, 2018. We are excited to announce a partnership for our sale coming soon. Stay tuned!</h4>

        <div>

          <Link to="/createAccount">
            <Button bsStyle="success" style={{width: 175, height: 40, marginBottom: 5, fontSize: "small"}}>Start a new account</Button>
          </Link>
          <br/>
          <Link to="/importAccount">
            <button style={{width: 175, height: 40, fontSize: "small"}}>I already have an account</button>
          </Link>
        </div>


        <h6 style={{justifyContent: "bottom", marginTop: "auto"}}>KUDOS v1.0</h6>

      </div>
    );
  }
}

export default NewUserComponent;
