import React, { Component } from 'react';
import {Link} from "react-router-dom";

class LoginComponent extends Component {

  render() {

    return (

      <div style={{border: "1px solid black", width: 200, textAlign: "center", padding: "25px"}}>

        <h1>kudos</h1>

        <Link to="/createAccount">
          <button style={{width: 150, height: 75, margin: "10px"}}>create account</button>
        </Link>

        <br/>
        <Link to="/importAccount">
          <button style={{width: 150, height: 75}}>import account</button>
        </Link>

      </div>
    );
  }
}

export default LoginComponent;
